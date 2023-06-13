// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

//totalLikes function
const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

//favoriteBlog function
const favoriteBlog = (blogs) => {
  const mostLiked = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === mostLiked)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

//mostBlogs function
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

//mostLikes function
const mostLikes = (blogs) => {
  let counts = {}
  blogs.map(blog => {
    const author = blog.author
    const likes = blog.likes

    if (author in counts) {
      counts[author] += likes
    }else {
      counts[author] = likes
    }
  })
  const propKeys = Object.keys(counts)
  const propValues = Object.values(counts)

  return {
    author: propKeys[propValues.indexOf(Math.max(...propValues))],
    likes: Math.max(...propValues)
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}