const Product=require("../../models/contacts")
const listContacts = async (req, res) => {
  // const result = await contactOperations.listContacts();
  // res.status(200).json({ data: result });
  const result= await Product.find({})
  res.status(200).json({ data: result });
};
module.exports = listContacts;
