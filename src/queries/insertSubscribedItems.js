import pool from '../database.js';

export default async function insertSubscribedItems(subscriptionId, itemId) {
  await pool.query(`
    INSERT INTO subscription_items (
      subscription_id,
      item_id
    ) VALUES ($1, $2);
  `, [subscriptionId, itemId]);
}
