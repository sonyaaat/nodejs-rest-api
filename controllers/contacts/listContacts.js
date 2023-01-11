const contactOperations = require("../../models/contacts");
const listContacts = async (req, res) => {
  const result = await contactOperations.listContacts();
  res.status(200).json({ data: result });
};
module.exports = listContacts;
