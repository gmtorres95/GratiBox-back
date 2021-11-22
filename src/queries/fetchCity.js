import pool from '../database.js';

export default async function fetchCity(city, stateId) {
  let result = await pool.query(`
    SELECT id FROM cities WHERE city = $1
  `, [city]);

  if (result.rowCount) return result.rows[0].id;

  result = await pool.query(`
    INSERT INTO cities (city, state_id) VALUES ($1, $2) RETURNING id;
  `, [city, stateId]);

  return result.rows[0].id;
}
