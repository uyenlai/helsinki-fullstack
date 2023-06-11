// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLiked = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === mostLiked)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const authorArr = blogs.map(blog => blog.author)
  const counts = {}
  for (const item of authorArr) {
    if (item in counts) {
      counts[item]++
    }else {
      counts[item] = 1
    }
  }
  const propKeys = Object.keys(counts)
  const propValues = Object.values(counts)

  return {
    author: propKeys[propValues.indexOf(Math.max(...propValues))],
    blogs: Math.max(...propValues)
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}