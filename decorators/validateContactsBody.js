import { HttpError } from '../helpers/index.js';

const validateBody = schema => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      const { name, email, phone, owner } = req.body;

      const errorReason = !name
        ? Object.keys({ name })
        : !email
        ? Object.keys({ email })
        : !phone
        ? Object.keys({ phone })
        : !owner
        ? Object.keys({ owner })
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

export default validateBody;
