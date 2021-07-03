/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.status(200).json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { author, url, likes, title } = request.body;
  const users = await User.find({});
  const selectedUser = users[Math.floor(Math.random() * users.length)];

  if (!url || !title) {
    return response.status(400).end();
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: selectedUser._id,
  });

  const savedBlog = await newBlog.save();

  selectedUser.blogs = selectedUser.blogs.concat(savedBlog._id);
  await selectedUser.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const noteToDelete = request.params.id;

  if (noteToDelete) {
    await Blog.findByIdAndDelete(noteToDelete);
    return response.status(204).end();
  }

  return response.status(404).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    ...body,
    likes: body.likes + 1,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
