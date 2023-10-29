import express from 'express';
import authController from '../../controller/auth-controller.js';

import {
  userSignupSchema,
  userSigninSchema,
  userEmailVerificationSchema,
} from '../../models/User.js';
import { validateAuthBody, validateEmail } from '../../decorators/index.js';
import { authenticate, isEmptyBody, upload } from '../../middlewares/index.js';

const signupValidator = validateAuthBody(userSignupSchema);
const signinValidator = validateAuthBody(userSigninSchema);
const emailVerificationValidator = validateEmail(userEmailVerificationSchema);

const router = express.Router();

router.post('/register', isEmptyBody, signupValidator, authController.register);

router.post('/login', isEmptyBody, signinValidator, authController.login);

router.post('/logout', authenticate, authController.logout);

router.get('/current', authenticate, authController.current);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  authController.updateAvatar
);

router.get('/verify/:verificationToken', authController.verify);

router.post(
  '/verify',
  isEmptyBody,
  emailVerificationValidator,
  authController.resendVerifyEmail
);

export default router;
