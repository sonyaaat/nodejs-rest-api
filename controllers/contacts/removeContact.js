const contactOperations = require("../../models/contacts");
const createError = require("http-errors");
const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await contactOperations.removeContact(id);
  if (!result) {
    throw createError(404, `Contact with id ${id} not found`);
  }
  res.json({ status: "contact deleted", code: "200", data: result });
};
module.exports = removeContact;
