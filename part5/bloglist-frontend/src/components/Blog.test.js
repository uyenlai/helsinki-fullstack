import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Canonical string reduction by Edsger W. Dijkstra'
  )
})

test('clicking the view button calls event handler once', async () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} toggleVisibility={mockHandler} />)

  const button = component.getByText('view')
  userEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  )

  expect(component.container).toHaveTextContent(
    '12'
  )
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateLikes={mockHandler} />
  )

  const button = screen.getByText('like')
  userEvent.click(button)
  await waitFor(() => expect(mockHandler.mock.calls).toHaveLength(1))
  userEvent.click(button)
  await waitFor(() => expect(mockHandler.mock.calls).toHaveLength(2))
})