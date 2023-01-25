const Product=require("../../models/contacts")
const listContacts = async (req, res) => {
  // let countQuery
  let filter
  const {id}=req.user
  const{limit=10,page=1,favorite=false}=req.query
  const skip=(page-1)*limit
  if(favorite)
  {
    filter={ owner:id,favorite}
  }
  else{
    filter={owner:id}
  }
  const result= await Product.find(filter,"",{skip,limit:Number(limit)})
  const countQuery = await Product.where(filter).countDocuments();
  
  res.status(200).json({ data: result,count:countQuery });
};
module.exports = listContacts;
