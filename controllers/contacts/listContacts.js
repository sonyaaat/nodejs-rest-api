const Product=require("../../models/contacts")
const listContacts = async (req, res) => {
  const {id}=req.user
  const countQuery = await Product.where({ 'owner': id }).countDocuments();
  const{limit=10,page=1,favorite=false}=req.query
  const limitCondition=countQuery<=Number(limit)*page && limit!==10 && page!==1 && Number(page)!== Math.ceil(countQuery/limit)
  if(limitCondition)
  {
    console.log(countQuery,limit)
    console.log(Math.round(countQuery/limit))
    res.status(404).json("The limit is exceed");
    return
  }
  const skip=(page-1)*limit
  let result= await Product.find({owner:id},"",{skip,limit:Number(limit)})
  if (favorite)
  {
     result= await Product.find({owner:id,favorite})
  }
  res.status(200).json({ data: result });
};
module.exports = listContacts;
