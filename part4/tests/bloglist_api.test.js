const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObjects = new Blog(blog)
    await blogObjects.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain('React patterns')
})

test('unique identifier property of the blog posts', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body.map(p => p._id)
  expect(id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A valid new blog',
    author: 'Sam',
    url: 'https://www.google.com',
    likes: 24
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(p => p.title)
  expect(contents).toContain('A valid new blog')
})

afterAll(async () => {
  await mongoose.connection.close()
})