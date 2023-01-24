const Product=require("../../models/contacts")
const listContacts = async (req, res) => {
  let countQuery
  const {id}=req.user
  const{limit=10,page=1,favorite=false}=req.query
  const skip=(page-1)*limit
  let result= await Product.find({owner:id},"",{skip,limit:Number(limit)})
  countQuery=await Product.where({owner:id}).countDocuments();
  if (favorite)
  {
     countQuery = await Product.where({ owner:id,favorite}).countDocuments();
     result= await Product.find({owner:id,favorite})
  }
  res.status(200).json({ data: result,count:countQuery });
};
module.exports = listContacts;
