import { useState } from 'react'

const Blog = (props) => {
  const { blog, user } = props;
  const [visible, setVisible] = useState(false)


  const showWhenVisible = { display: visible ? '' : 'none'}
  
  const toggleVisibility = () => {
    setVisible(!visible)
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
    <div style={blogStyle}>
      <p>Title: {blog.title} by {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      <div style={showWhenVisible}>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes} <button>like</button></p>
      <p>User: {user.name}</p>
      </div>
    </div>  
  )
}

export default Blog

