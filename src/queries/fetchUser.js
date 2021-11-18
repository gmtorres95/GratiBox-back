import pool from '../database.js';

export default async function fetchUser(value) {
  const filter = Number(value) ? 'id' : 'email';

  const result = await pool.query(
    `SELECT * FROM users WHERE ${filter} = $1`,
    [value],
  );

  return result.rows;
}
