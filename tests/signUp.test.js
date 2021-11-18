import supertest from 'supertest';
import '../src/setup.js';
import pool from '../src/database.js';
import app from '../src/app.js';
import fakeUser from './factories/fakeUser.js';

describe('POST /sign-up', () => {
  const userData = fakeUser();

  afterAll(async () => {
    await pool.query('DELETE FROM users;');
    pool.end();
  });

  it('should return 201 if user data is valid', async () => {
    const result = await supertest(app)
      .post('/sign-up')
      .send(userData);

    expect(result.status).toEqual(201);
  });

  it('should return 409 if user email is already being used', async () => {
    const result = await supertest(app)
      .post('/sign-up')
      .send(userData);

    expect(result.status).toEqual(409);
  });

  it('should return 400 if user data is invalid', async () => {
    const invalidUser = fakeUser();
    delete invalidUser.name;

    const result = await supertest(app)
      .post('/sign-up')
      .send(invalidUser);

    expect(result.status).toEqual(400);
  });
});
