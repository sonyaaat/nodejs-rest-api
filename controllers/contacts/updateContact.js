const contactOperations = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");

const updateContactScema = Joi.object({
  name: Joi.string().min(5).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(8).max(15),
});
const updateContact = async (req, res) => {
  const id = req.params.contactId;
  if (!req.body) {
    res.status(404).json({message: "missing fields"})
  }
  const { error } = updateContactScema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await contactOperations.updateContact(id, req.body);
  if (!result) {
    throw createError(404, `Contact with id ${id} not found`);
  }
  res.status(200).json({ data: result });
};
module.exports = updateContact;
