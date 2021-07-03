const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json...', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('...and all of them are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id property is defined', async () => {
  const blogs = await helper.blogsInDb();
  blogs.map((blog) => expect(blog.id).toBeDefined());
});

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Amazing Page',
    author: 'Luis Guzman',
    url: 'https://lmaero.pro/',
    likes: 5000,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const authors = blogsAtEnd.map((blog) => blog.title);
  expect(authors).toContain('Amazing Page');
});

test('if likes property is missing, default value will be 0', async () => {
  const newBlog = {
    title: 'A page with 0 likes',
    author: 'Non-liked author',
    url: 'https://author.sad/',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const recentlyAddedBlog = blogsAtEnd.find(
    (blog) => blog.title === newBlog.title,
  );
  expect(recentlyAddedBlog.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
