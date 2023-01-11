const contactOperations = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");
const contactsSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(8).max(15).required(),
});
const addContact = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await contactOperations.addContact(req.body);
  res.json({ status: "success", code: "201", data: result });
};
module.exports = addContact;
