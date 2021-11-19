import pool from '../database.js';

export default async function fetchPlans(deliveryDayId) {
  const result = await pool.query(`
    SELECT
      plans.plan AS name,
      delivery_days.day AS delivery_day
    FROM delivery_days
      JOIN plans
        ON delivery_days.plan_id = plans.id
    WHERE delivery_days.id = $1;
    `, [deliveryDayId]);

  return result.rows;
}
