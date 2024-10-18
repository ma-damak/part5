import { useState } from 'react'

const LoginForm = ({ handleLogin, setMessage, children }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleLogin({ username, password })
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({
        text: 'Wrong credentials',
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      {children}
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}
export default LoginForm
