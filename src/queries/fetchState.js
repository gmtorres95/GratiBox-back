import pool from '../database.js';

export default async function fetchState(state) {
  let result = await pool.query(`
    SELECT id FROM states WHERE state = $1
  `, [state]);

  if (result.rowCount) return result.rows[0].id;

  result = await pool.query(`
    INSERT INTO states (state) VALUES ($1) RETURNING id;
  `, [state]);

  return result.rows[0].id;
}
