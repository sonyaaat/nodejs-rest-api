const User = require("../../models/users");
const logout=async(req,res,next)=>{
const {id}=req.user
await User.findByIdAndUpdate(id,{token:null})
res.status(204).json()
}
module.exports=logout