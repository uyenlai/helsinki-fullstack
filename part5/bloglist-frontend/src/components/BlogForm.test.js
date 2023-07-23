import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewBlogForm from './CreateNewBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateNewBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  render(<CreateNewBlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('Title')
  const authorInput = screen.getByLabelText('Author')
  const urlInput = screen.getByLabelText('Url')
  const sendButton = screen.getByText('Create')

  await userEvent.type(titleInput, 'Canonical string reduction')
  await userEvent.type(authorInput, 'Edsger W. Dijkstra')
  await userEvent.type(urlInput, 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Canonical string reduction')
  expect(createBlog.mock.calls[0][0].author).toBe('Edsger W. Dijkstra')
  expect(createBlog.mock.calls[0][0].url).toBe('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
})