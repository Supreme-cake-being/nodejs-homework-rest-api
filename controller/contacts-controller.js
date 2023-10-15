import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Contact from '../models/Contact.js';

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const owner = req.user;
  console.log(req.body);
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'Contact deleted' });
};

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
