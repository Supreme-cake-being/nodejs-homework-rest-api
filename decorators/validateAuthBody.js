import { HttpError } from '../helpers/index.js';

const validateAuthBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { email, password } = req.body;

      const errorReason = !email
        ? Object.keys({ email })
        : !password
        ? Object.keys({ password })
        : null;

      if (errorReason) {
        return next(HttpError(400, `Missing required '${errorReason}' field`));
      }

      return next(HttpError(400, 'Validation failed'));
    }
    next();
  };

  return func;
};

export default validateAuthBody;
