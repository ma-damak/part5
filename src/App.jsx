import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const blogsToShow = [...blogs].sort((a, b) => b.likes - a.likes)

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (credentials) => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    setUser(user)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    const blog = await blogService.create(blogObject)

    blogFormRef.current.toggleVisibility()
    setBlogs([
      ...blogs,
      {
        ...blog,
        user: { id: blog.user, name: user.name, username: user.username },
      },
    ])
  }

  if (user === null) {
    return (
      <LoginForm handleLogin={handleLogin} setMessage={setMessage}>
        <Notification message={message} />
      </LoginForm>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p style={{ backgroundColor: 'yellow' }}>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} setMessage={setMessage} />
      </Togglable>
      {blogsToShow.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          user={user}
          setMessage={setMessage}
        />
      ))}
    </div>
  )
}

export default App
