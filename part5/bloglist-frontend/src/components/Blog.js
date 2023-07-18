import { useState } from 'react'

const Blog = (props) => {
  const { blog, user } = props
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
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
    marginBottom: 5
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle}  className='blog'>
      <p>Title: {blog.title} by {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLikes}>like</button></p>
        {user ? <p>User: {user.name}</p> : <p>User: Not available</p>}
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  )
}

export default Blog

