import express from 'express';
import contactsService from '../../models/contacts.js';
import { HttpError } from '../../helpers/index.js';
import Joi from 'joi';

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(`^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$`))
    .required(),
  email: Joi.string()
    .pattern(new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$'))
    .required(),
  phone: Joi.string()
    .pattern(new RegExp('^[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4}$'))
    .required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      const { name, email, phone } = req.body;

      const errorReason = !name
        ? Object.keys({ name })
        : !email
        ? Object.keys({ email })
        : !phone
        ? Object.keys({ phone })
        : 'some';

      throw HttpError(400, `Missing required '${errorReason}' field`);
    }

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      const { name, email, phone } = req.body;

      const errorReason = !name
        ? Object.keys({ name })
        : !email
        ? Object.keys({ email })
        : !phone
        ? Object.keys({ phone })
        : 'some';

      throw HttpError(400, `Missing required '${errorReason}' field`);
    }

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
