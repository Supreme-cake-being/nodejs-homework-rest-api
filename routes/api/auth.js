import express from 'express';
import authController from '../../controller/auth-controller.js';

import { userSignupSchema, userSigninSchema } from '../../models/User.js';
import { validateAuthBody } from '../../decorators/index.js';
import { authenticate, isEmptyBody } from '../../middlewares/index.js';

const signupValidator = validateAuthBody(userSignupSchema);
const signinValidator = validateAuthBody(userSigninSchema);

const router = express.Router();

router.post('/register', isEmptyBody, signupValidator, authController.register);

router.post('/login', isEmptyBody, signinValidator, authController.login);

router.post('/logout', authenticate, authController.logout);

router.get('/current', authenticate, authController.current);

export default router;
