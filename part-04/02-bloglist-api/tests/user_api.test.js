const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const hardCodedPassword = 'easyToRemember';

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(hardCodedPassword, saltRounds);

  const newInitialUser = new User({
    username: 'lmaero.pro',
    name: 'Luis Guzman',
    passwordHash,
  });

  await newInitialUser.save();
});

describe('when there is one initial user in DB', () => {
  test('all users can be retrieved', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all users are returned', async () => {
    const usersAtStart = await api.get('/api/users');
    expect(usersAtStart.body).toHaveLength(1);
  });
});

describe('when tries to store a new user', () => {
  test('a valid user can be saved', async () => {
    const usersAtStart = await api.get('/api/users');

    const newUser = {
      username: 'newValidUserName',
      name: 'Valid User',
      password: 'anEasyPassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await api.get('/api/users');
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1);

    const usernames = usersAtEnd.body.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('an user with the same username cannot be saved', async () => {
    const usersAtStart = await api.get('/api/users');

    const newUser = {
      username: 'lmaero.pro',
      name: 'NonSaved User',
      password: 'non-uniqueUser',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Error, expected `username` to be unique. Value: `lmaero.pro`"}',
      );

    const usersAtEnd = await api.get('/api/users');
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length);

    const usernames = usersAtEnd.body.map((u) => u.name);
    expect(usernames).not.toContain('NonSaved User');
  });

  test('an user without password cannot be saved', async () => {
    const usersAtStart = await api.get('/api/users');

    const newUser = {
      username: 'lmaero.pro',
      name: 'Without Password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"Missing username or password"}');

    const usersAtEnd = await api.get('/api/users');
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length);

    const usernames = usersAtEnd.body.map((u) => u.name);
    expect(usernames).not.toContain('Without Password');
  });

  test('an user without username cannot be saved', async () => {
    const usersAtStart = await api.get('/api/users');

    const newUser = {
      name: 'Without username',
      password: 'withoutUsername',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"Missing username or password"}');

    const usersAtEnd = await api.get('/api/users');
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length);

    const usernames = usersAtEnd.body.map((u) => u.name);
    expect(usernames).not.toContain('Without Password');
  });

  test('an user with a short password cannot be saved', async () => {
    const usersAtStart = await api.get('/api/users');

    const newUser = {
      name: 'Short Password',
      password: '1',
      username: 'tooShort',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('{"error":"Password needs to be at least 3 characters long"}');

    const usersAtEnd = await api.get('/api/users');
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length);

    const usernames = usersAtEnd.body.map((u) => u.name);
    expect(usernames).not.toContain('Without Password');
  });

  test('an user with a short username cannot be saved', async () => {
    const usersAtStart = await api.get('/api/users');

    const newUser = {
      name: 'Short Username',
      password: 'shortUsername',
      username: 'sh',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Path `username` (`sh`) is shorter than the minimum allowed length (3)."}',
      );

    const usersAtEnd = await api.get('/api/users');
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length);

    const usernames = usersAtEnd.body.map((u) => u.name);
    expect(usernames).not.toContain('Without Password');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
