import insertUser from '../queries/insertUser.js';
import validateNewUser from '../validations/newUser.js';

export default async function signUp(req, res) {
  const user = req.body;
  const validation = await validateNewUser(user);

  try {
    if (validation.isInvalid) throw validation.errorCode;
    await insertUser(user);

    res.sendStatus(201);
  } catch (error) {
    if (validation.isInvalid) {
      return res.status(error).send(validation.errorMessage);
    }

    res.sendStatus(500);
  }
}
