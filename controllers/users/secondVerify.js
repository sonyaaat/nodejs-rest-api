const User = require("../../models/users");
const Joi = require("joi");
const sendGrid=require("../../helpers/sendGrid")
const verifySchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required("missing required field email"),
});
const secondVerify = async (req, res) => {
  const { error } = verifySchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: "missing required field email" });
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("There isn`t such contact");
  }
  if(user.verify)
  {
    return res.status(404).json({message:"Verification has already been passed"});
  }
  const mail={
    to:email,
    subject:"Verification",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/confirmEmail/${user.verificationToken}">Click to confirm your email</a>`,
  }
  sendGrid(mail)
  res.status(200).json({ message: "Verification email sent" });
};
module.exports = secondVerify;
