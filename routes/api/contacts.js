import express from 'express';
import contactsService from '../../models/contacts.js';
import httpError from '../../helpers/httpError.js';
import Joi from 'joi';

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw httpError(404, 'Not found');
    }

    res.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw httpError(400, 'Missing required name field');
    }

    const result = await contactsService.addContact(req.body);
    res.status(201).json({
      status: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw httpError(404, 'Not found');
    }

    res.json({
      status: 200,
      message: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'Missing fields');
    }

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404, 'Not found ');
    }

    res.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
