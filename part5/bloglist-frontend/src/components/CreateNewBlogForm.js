const CreateNewBlogForm = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl
}) => {

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            {' '}
            Title
            <input value={newTitle} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <label>
            {' '}
            Author
            <input value={newAuthor} onChange={handleAuthorChange} />
          </label>
        </div>
        <div>
          <label>Url</label>
          <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateNewBlogForm