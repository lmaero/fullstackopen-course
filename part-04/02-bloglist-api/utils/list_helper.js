const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0].likes;

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 'No blogs in this list';

  if (blogs.length === 1) {
    const { title, author, likes } = blogs[0];
    return { title, author, likes };
  }

  const orderedByLikes = blogs.sort((a, b) => b.likes - a.likes);
  const { title, author, likes } = orderedByLikes[0];
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 'No blogs in this list';

  if (blogs.length === 1) {
    const { author } = blogs[0];
    return { author, blogs: 1 };
  }

  const authors = blogs.map((blog) => blog.author);
  const authorWithMostBlogs = _.maxBy(authors);
  const blogsCount = _.filter(blogs, { author: authorWithMostBlogs }).length;

  return { author: authorWithMostBlogs, blogs: blogsCount };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
