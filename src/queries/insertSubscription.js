import pool from '../database.js';

export default async function insertSubscription(dayId, userId, deliveryId) {
  const today = new Date();

  const result = await pool.query(`
    INSERT INTO subscriptions (
      delivery_day_id,
      user_id,
      delivery_detail_id,
      subscription_date
    ) VALUES ($1, $2, $3, $4) RETURNING id;
  `, [dayId, userId, deliveryId, today]);

  return result.rows[0].id;
}
