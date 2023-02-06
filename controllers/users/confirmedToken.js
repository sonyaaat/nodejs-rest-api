const User = require("../../models/users");
const confirmedToken = async (req, res, next) => {
  const {confirmationToken} = req.params;
  console.log("token",confirmationToken)
  const user = await User.findOne({ confirmationToken });
  if (!user) {
    throw new Error("There isn`t such contact");
  }
  console.log("User",user._id)
//   user.confirmed=true
//   user.confirmationToken=" "
//   user.verificationToken=" "
//   await user.save()
  await User.findByIdAndUpdate(user._id,{confirmed:true,confirmationToken:null})
  res.status(200).json({ message:"Success. You confirmed your account" });
};
module.exports = confirmedToken;
