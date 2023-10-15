import { HttpError } from '../helpers/index.js';

const validateBody = schema => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, `Missing field favorite`));
    }
    next();
  };

  return func;
};

export default validateBody;
