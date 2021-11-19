import pool from '../database.js';

export default async function fetchSubscriptionItems(subscriptionId) {
  const result = await pool.query(`
    SELECT items.*
    FROM subscription_items
      JOIN items
        ON subscription_items.item_id = items.id
    WHERE subscription_items.subscription_id = 1;
    `, [subscriptionId]);

  return result.rows;
}
