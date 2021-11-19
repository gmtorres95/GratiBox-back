import pool from '../database.js';

export default async function fetchDeliveryDetails(deliveryDetailId) {
  const result = await pool.query(`
    SELECT
      delivery_details.name,
      delivery_details.address,
      delivery_details.zipcode,
      cities.city,
      states.state
    FROM cities
      JOIN delivery_details
        ON cities.id = delivery_details.city_id
      JOIN states
        ON cities.state_id = states.id
    WHERE delivery_details.id = $1;
    `, [deliveryDetailId]);

  return result.rows;
}
