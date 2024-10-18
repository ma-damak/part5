import { useState } from 'react'

const BlogForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    try {
      e.preventDefault()
      await createBlog({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage({
        text: `a new blog ${title}${author ? ` by ${author}` : ''} added`,
        type: 'success',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage({
        text: error.response.data.error,
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
export default BlogForm
