import generateErrorMessage from '../factories/generateErrorMessage.js';
import fetchUser from '../queries/fetchUser.js';
import userSchema from './schemas/newUserSchema.js';

export default async function validateNewUser(user) {
  let validation = { isInvalid: false };
  const joiValidation = userSchema.validate(user);

  try {
    if (joiValidation.error) {
      validation = generateErrorMessage(
        400,
        joiValidation.error.details[0].message,
      );

      return validation;
    }

    const isExistingEmail = await fetchUser(user);

    if (isExistingEmail.length > 0) {
      validation = generateErrorMessage(409, 'Email is already registered.');

      return validation;
    }

    return validation;
  } catch (error) {
    validation = generateErrorMessage(500, 'unknown error');

    return validation;
  }
}
