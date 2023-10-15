import express from 'express';
import contactsController from '../../controller/contacts-controller.js';
import {
  validateContactsBody,
  validateFavorite,
} from '../../decorators/index.js';
import {
  isEmptyBody,
  isValidId,
  authenticate,
} from '../../middlewares/index.js';
import {
  contactsAddSchema,
  contactUpdateFavoriteSchema,
} from '../../models/Contact.js';

const contactsValidator = validateContactsBody(contactsAddSchema);
const contactUpdateFavoriteValidate = validateFavorite(
  contactUpdateFavoriteSchema
);

const router = express.Router();

router.get('/', authenticate, contactsController.getAll);

router.get('/:contactId', authenticate, isValidId, contactsController.getById);

router.post(
  '/',
  authenticate,
  isEmptyBody,
  contactsValidator,
  contactsController.add
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  contactsController.deleteById
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  isEmptyBody,
  contactsValidator,
  contactsController.updateById
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

export default router;
