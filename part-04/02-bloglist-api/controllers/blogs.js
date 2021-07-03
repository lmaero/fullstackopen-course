const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { author, url, likes, title } = request.body;

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  const result = await newBlog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
