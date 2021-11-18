import pool from '../database.js';

export default async function insertSession(id, token) {
  await pool.query('INSERT INTO sessions (client_id, token) VALUES ($1, $2)', [
    id,
    token,
  ]);
}
