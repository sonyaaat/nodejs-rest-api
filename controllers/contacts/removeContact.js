const contactOperations = require("../../models/contacts");
const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await contactOperations.removeContact(id);
  if (!result) {
    res.status(404).json({message: `Contact with id ${id} not found`})
   
  }
  res.status(200).json({  data: result });
};
module.exports = removeContact;
