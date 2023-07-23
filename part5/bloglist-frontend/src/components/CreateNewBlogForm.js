import React, { useState } from 'react'
const CreateNewBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='titleInput'>
            {' '}
            Title
            <input
              type='text'
              id='titleInput'
              value={newTitle}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor='authorInput'>
            {' '}
            Author
            <input
              type='text'
              id='authorInput'
              value={newAuthor}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor='urlInput'>
            {' '}
            Url
          </label>
          <input
            type='text'
            id='urlInput'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateNewBlogForm