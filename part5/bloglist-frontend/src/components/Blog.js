import { useState } from 'react'

const Blog = (props) => {
  const { blog, user } = props
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes || 0)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = () => {
    const updatedLikes = likes + 1
    setLikes(updatedLikes)

    const updatedBlog = {
      ...blog,
      likes: updatedLikes,
    }

    props.updateLikes(updatedBlog)
  }

  const handleRemove = () => {
    props.removeBlog(blog)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className='blog'>
      <p>
        Title: {blog.title} by {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </p>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>
          Likes: {likes} <button onClick={updateLikes}>like</button>
        </p>
        {user ? <p>User: {user.name}</p> : <p>User: Not available</p>}
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
