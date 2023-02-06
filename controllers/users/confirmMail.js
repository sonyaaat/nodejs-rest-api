const User = require("../../models/users");
const sendGrid = require("../../helpers/sendGrid");
const { v4: uuidv4 } = require("uuid");
const confirmMail = async (req, res, next) => {
  const {email} = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("There isn`t such contact");
  }
  const confirmationToken = uuidv4();
  user.confirmationToken = confirmationToken;
  await user.save();
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/confirmEmail/${confirmationToken}">Click to confirm your email</a>`,
  };
  sendGrid(mail);
  res.status(200).json({ confirmationToken });
};
module.exports = confirmMail;
