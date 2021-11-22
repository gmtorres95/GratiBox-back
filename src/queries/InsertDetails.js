import pool from '../database.js';

export default async function insertDetails(details, cityId) {
  const {
    name,
    address,
    zipcode,
  } = details;

  const result = await pool.query(`
    INSERT INTO delivery_details (
      name,
      address,
      zipcode,
      city_id
    ) VALUES ($1, $2, $3, $4) RETURNING id;
  `, [name, address, zipcode, cityId]);

  return result.rows[0].id;
}
