import bcrypt from 'bcrypt';

import pool from '../database.js';

export default async function insertUser(userData) {
  const {
    name,
    email,
    password,
  } = userData;
  const hash = bcrypt.hashSync(password, 10);

  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',

    [name, email, hash],
  );

  return result.rows[0].id;
}
