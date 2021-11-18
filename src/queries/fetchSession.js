import pool from '../database.js';

export default async function fetchSession(session) {
  const filter = Number(session) ? 'user_id' : 'token';

  const result = await pool.query(
    `SELECT * FROM sessions WHERE ${filter} = $1;`,
    [session],
  );

  return result;
}
