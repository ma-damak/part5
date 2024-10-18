import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user, setMessage }) => {
  const [isHidden, setIsHidden] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      })

      setBlogs((prevBlogs) => {
        return prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      })
    } catch (error) {
      setMessage({
        text: `${blog.title} has already been removed from the database`,
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs((prevBlogs) => {
        return prevBlogs.filter((b) => b.id !== blog.id)
      })
    }
  }

  const handleDelete = async () => {
    try {
      if (
        window.confirm(
          `Remove ${blog.title}${blog.author ? ` by ${blog.author}` : ''} ?`
        )
      ) {
        await blogService.deleteBlog(blog.id)
      }
    } catch (error) {
      setMessage({
        text: `${blog.title} has already been removed from the database`,
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setBlogs((prevBlogs) => {
      return prevBlogs.filter((b) => b.id !== blog.id)
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? 'view' : 'hide'}
        </button>
      </div>
      {!isHidden && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleClick}>like</button>
          </p>

          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}
export default Blog
