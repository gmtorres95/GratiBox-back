import joi from 'joi';

const userSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(20)
    .pattern(/[^0-9.,"?!;:#$%&()*+-/<>=@[\\\]^_{}|~]+/)
    .required(),
  email: joi.string().pattern(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi).required(),
  password: joi.string().min(4).max(32).required(),
});

export default userSchema;
