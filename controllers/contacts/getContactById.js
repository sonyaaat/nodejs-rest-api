const contactOperations = require("../../models/contacts");
const createError = require("http-errors");
const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contactOperations.getContactById(req.params.contactId);

  if (!result) {
    throw createError(404, `Contact with id ${id} not found`);
  }
  res.json({ status: "success", code: "200", data: result });
};
module.exports = getContactById;
