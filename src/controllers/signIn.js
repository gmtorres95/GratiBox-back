import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import insertSession from '../queries/insertSession.js';
import fetchSession from '../queries/fetchSession.js';
import fetchUser from '../queries/fetchUser.js';

export default async function signIn(req, res) {
  const userData = req.body;
  if (!userData.email || !userData.password) return res.sendStatus(400);

  try {
    const user = await fetchUser(userData.email);
    if (user.length === 0) return res.sendStatus(401);

    const correctPassword = bcrypt.compareSync(userData.password, user[0].password);
    if (!correctPassword) return res.sendStatus(401);

    const tokenSearch = await fetchSession(user[0].id);
    let token = uuid();

    if (tokenSearch.rowCount > 0) token = tokenSearch.rows[0].token;
    else await insertSession(user[0].id, token);

    res.send({
      id: user[0].id,
      name: user[0].name,
      token,
    });
  } catch (error) {
    res.sendStatus(500);
  }
}
