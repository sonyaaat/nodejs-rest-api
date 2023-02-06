const User = require("../../models/users");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const sendGrid=require("../../helpers/sendGrid")
const resetPas = async (req, res, next) => {
   // console.log("body",req.body)
  const  {email} = req.body;
  console.log("email",email)
  const user= await User.findOne({email})
  console.log("User",user.email,user.confirmed)
  if(!user)
  {
    throw new Error("There isn`t such contact")
  }
  if(!user.confirmed)
  {
    throw new Error("Confirm your email")
  }
  const newPassword=uuidv4()
 const hashedPass= bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
  const mail={
    to:email,
    subject:"Email confirmation",
    html:`<p>Your new password is ${newPassword}</p>`
  }
  sendGrid(mail)
  await User.findByIdAndUpdate(user._id,{confirmed:false,password:hashedPass})
  res.status(200).json(newPassword)
};
module.exports = resetPas;
