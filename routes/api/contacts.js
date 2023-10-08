import express from 'express';
import contactsController from '../../controller/contacts-controller.js';
import validateBody from '../../decorators/validateBody.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import {
  contactsAddSchema,
  contactUpdateFavoriteSchema,
} from '../../models/Contact.js';

const contactsValidator = validateBody(contactsAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post('/', isEmptyBody, contactsValidator, contactsController.add);

router.delete('/:contactId', isValidId, contactsController.deleteById);

router.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  contactsValidator,
  contactsController.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  contactsController.updateStatusContact
);

export default router;
