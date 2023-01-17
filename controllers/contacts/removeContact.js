
const Product=require("../../models/contacts")
const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await Product.findByIdAndRemove({_id:id})
  if (!result) {
    res.status(404).json({message: `Contact with id ${id} not found`})
    return
  }
  res.status(200).json({  data: result });
};
module.exports = removeContact;
