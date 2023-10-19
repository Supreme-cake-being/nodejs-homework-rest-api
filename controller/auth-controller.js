import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import User from '../models/User.js';

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} in use`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashedPassword });

  res.status(201).json({
    email,
    subscription: 'starter',
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
  const loggedUser = await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: loggedUser.email,
      subscription: loggedUser.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
