/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const userExtractor = require('../middleware/userExtractor');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
    });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response
      .status(200)
      .json(blog);
  } else {
    response
      .status(404)
      .end();
  }
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const {
    author,
    url,
    likes,
    title,
  } = request.body;
  const { user } = request;

  if (!url || !title) {
    return response
      .status(400)
      .end();
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

  return response
    .status(201)
    .json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const isAValidId = mongoose.Types.ObjectId.isValid(request.params.id);
  if (!isAValidId) {
    return response
      .status(401)
      .json({ error: 'Invalid ID' });
  }

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response
      .status(404)
      .json({ error: 'Blog does not exist' });
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
  return response
    .status(204)
    .end();
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blogToUpdateId = request.params.id;
  const newBlogObject = request.body;

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(blogToUpdateId, newBlogObject, { new: true })
      .populate('user', { username: 1, name: 1 });

    return response
      .status(200)
      .json(updatedBlog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id;
  if (!blogId) {
    return response
      .status(400)
      .json({ error: 'Invalid ID' });
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response
      .status(404)
      .end();
  }

  const { comments } = blog;

  return response
    .status(200)
    .json(comments);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogToUpdateId = request.params.id;
  const { content } = request.body;

  if (!blogToUpdateId || !content) {
    return response
      .status(400)
      .end();
  }

  const commentedBlog = await Blog.findById(blogToUpdateId);

  if (!commentedBlog) {
    return response
      .status(404)
      .end();
  }

  commentedBlog.comments = commentedBlog.comments.concat(content);
  await commentedBlog.save();

  return response
    .status(201)
    .json(commentedBlog);
});

module.exports = blogsRouter;
