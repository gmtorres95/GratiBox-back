import supertest from 'supertest';
import '../src/setup.js';
import pool from '../src/database.js';
import app from '../src/app.js';
import fakeUser from './factories/fakeUser.js';
import insertUser from '../src/queries/insertUser.js';

describe('POST /sign-in', () => {
  const userData = fakeUser();
  let userId;

  beforeAll(async () => {
    userId = insertUser(userData);
  });

  afterAll(async () => {
    await pool.query('DELETE FROM sessions;');
    await pool.query('DELETE FROM users;');
    pool.end();
  });

  it('should return 200 if user data is valid', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send(userData);

    expect(result.status).toEqual(200);
  });

  it('should return 400 if user password is missing', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: userData.email });

    expect(result.status).toEqual(400);
  });

  it('should return 400 if user email is missing', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({ password: userData.password });

    expect(result.status).toEqual(400);
  });

  it('should return 401 if password is invalid', async () => {
    const invalidUser = {
      email: userData.email,
      password: 'wrong_password',
    };

    const result = await supertest(app)
      .post('/sign-in')
      .send(invalidUser);

    expect(result.status).toEqual(401);
  });

  it('should return 401 if email is invalid', async () => {
    const invalidUser = {
      email: 'fake@email.test',
      password: userData.password,
    };

    const result = await supertest(app)
      .post('/sign-in')
      .send(invalidUser);

    expect(result.status).toEqual(401);
  });
});
