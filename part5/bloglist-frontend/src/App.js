import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Success from './components/Success'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
      } catch (error) {
        console.log('Error:', error.message)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Wrong username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
      togglableRef.current.toggleVisibility()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload(false)
  }

  const togglableRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      const returnedObject = await blogService.create(blogObject)
      setBlogs((prevBlogs) => [...prevBlogs, returnedObject])
      setSuccess(
        `A new blog ${returnedObject.title} by ${returnedObject.author} added`
      )
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch (error) {
      setError('Failed to create a new blog')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    togglableRef.current.toggleVisibility()
  }

  const updateLikes = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id !== blogToUpdate.id ? blog : updatedBlog
        )
      )
    } catch (error) {
      setError('Failed to update likes')
    }
  }

  const removeBlog = async (blogToRemove) => {
    const answer = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
    )

    if (answer) {
      try {
        await blogService.remove(blogToRemove)
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.id !== blogToRemove.id)
        )
      }catch (error) {
        setError('Failed to remove blog')
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error message={error} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>
      <Success message={success} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      {user && (
        <Togglable ref={togglableRef} buttonLabel="New blog">
          <CreateNewBlogForm createBlog={createBlog}
          />
        </Togglable>
      )}

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateLikes={updateLikes}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}
export default App
