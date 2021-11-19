import pool from '../database.js';

export default async function fetchSubscriptions(userId) {
  const result = await pool.query(`
    SELECT
      id,
      subscription_date,
      delivery_day_id,
      delivery_detail_id
    FROM subscriptions
    WHERE user_id = $1;
    `, [userId]);
  return result.rows;
}
