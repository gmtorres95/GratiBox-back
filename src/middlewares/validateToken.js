import fetchSession from '../queries/fetchSession';

export default async function validateToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const session = await fetchSession(token);

  if (session.rowCount === 0) {
    return res.status(401).send('Invalid token!');
  }

  next();
}
