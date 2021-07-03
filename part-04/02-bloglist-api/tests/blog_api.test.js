const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initial data saved to DB', () => {
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
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogToViewJSON = JSON.parse(JSON.stringify(blogToView));
    expect(result.body).toEqual(blogToViewJSON);
  });

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });
});

describe('addition of new blogs', () => {
  test('a blog can be added if has valid data', async () => {
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

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Amazing Page');
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

  test('if the title property is missing, response has 400 status', async () => {
    const newBlog = {
      author: 'non-existing author',
      url: 'https://missingtitle.com',
      likes: 0,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const authors = blogsAtEnd.map((blog) => blog.author);
    expect(authors).not.toContain('non-existing author');
  });

  test('if the url property is missing, response has 400 status', async () => {
    const newBlog = {
      author: 'non-existing author',
      title: 'Missing URL blog',
      likes: 0,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const authors = blogsAtEnd.map((blog) => blog.author);
    expect(authors).not.toContain('non-existing author');
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((blog) => blog.author);
    expect(contents).not.toContain(blogToDelete.author);
  });
});

describe('update of a blog', () => {
  test('likes is properly increased', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
