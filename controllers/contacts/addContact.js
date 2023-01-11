const contactOperations = require("../../models/contacts");
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
    res.status(404).json({message: error.message})
  }
  const result = await contactOperations.addContact(req.body);
  res.status(201).json({ data: result });
};
module.exports = addContact;
