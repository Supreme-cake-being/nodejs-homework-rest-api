import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactsAddSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(`^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$`))
    .required(),
  email: Joi.string()
    .pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'))
    .required(),
  phone: Joi.string()
    .pattern(new RegExp('^[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$'))
    .required(),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    message: 'Missing field favorite',
  }),
});

const Contact = model('contact', contactSchema);

export default Contact;
