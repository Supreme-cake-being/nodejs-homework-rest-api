import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  avatarURL: {
    type: String,
  },
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const userEmailVerificationSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model('user', userSchema);

export default User;
