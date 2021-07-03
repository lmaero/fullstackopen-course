/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const userExtractor = require('../middleware/userExtractor');
const Blog = require('../models/blog');

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { author, url, likes, title } = request.body;
  const { user } = request;

  if (!url || !title) {
    return response.status(400).end();
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await newBlog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const isAValidId = mongoose.Types.ObjectId.isValid(request.params.id);
  if (!isAValidId) {
    return response.status(401).json({ error: 'Invalid ID' });
  }

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(404).json({ error: 'Blog does not exist' });
  }

  const { user } = request;

  if (!blogToDelete.user) {
    return response
      .status(400)
      .json({ error: 'This blog was not created by any user' });
  }

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: 'You cannot delete blogs of other users' });
  }

  await blogToDelete.remove();

  user.blogs = user.blogs.filter(
    (blog) => blog._id.toString() !== blogToDelete._id.toString(),
  );
  await user.save();

  return response.status(204).end();
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
