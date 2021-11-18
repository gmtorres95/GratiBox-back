import pool from '../database.js';

export default async function insertSession(id, token) {
  await pool.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2)', [id, token]);
}
