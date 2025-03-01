const Product=require("../../models/contacts")
const getContactById = async (req, res) => {
  const {id:userId}=req.user
  const id = req.params.contactId;
    const result=await Product.findOne({_id:id,owner:userId})
  if (!result) {
    res.status(404).json({message: `Contact with id ${id} not found`})
    return
  }
  res.status(200).json({data: result });
};
module.exports = getContactById;
