import { HttpError } from '../helpers/index.js';

const validateBody = schema => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      const { name, email, phone } = req.body;

      const errorReason = !name
        ? Object.keys({ name })
        : !email
        ? Object.keys({ email })
        : !phone
        ? Object.keys({ phone })
        : 'some';

      return next(HttpError(400, `Missing required '${errorReason}' field`));
    }
    next();
  };

  return func;
};

export default validateBody;
