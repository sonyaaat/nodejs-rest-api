const User=require("../../models/users")
const verify= async (req,res,next)=>{
const {verificationToken}=req.params
console.log(verificationToken)
const user= await User.findOne({verificationToken})
if(!user)
{
    return res.status(404).json({ message: "Your verify token is incorrect" });
}
user.verify=true
user.verificationToken=" "
await user.save()
res.status(200).json({  message: 'Verification successful',});
}
module.exports=verify