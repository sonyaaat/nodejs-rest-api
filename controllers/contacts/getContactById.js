const contactOperations = require("../../models/contacts");
const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contactOperations.getContactById(req.params.contactId);

  if (!result) {
    res.status(404).json({message: `Contact with id ${id} not found`})
  }
  res.status(200).json({data: result });
};
module.exports = getContactById;
