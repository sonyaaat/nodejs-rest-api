const { Conflict } = require("http-errors");
const Joi = require("joi");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const User = require("../../models/users");
const sendMail = require("../../helpers/sendGrid.js");
const usersSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).max(50).required(),
  subscription: Joi.string(),
  avatar: Joi.string(),
});
const register = async (req, res, next) => {
  const { error } = usersSchema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: error.message });
  }
  const { subscription, email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.find({ email });
  if (!user) {
    throw new Conflict(`User with email ${email}  already exists`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = uuidv4()
  await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail={
    to:email,
    subject:"Email confirmation",
    html:`<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify</a>`
  }
  await sendMail(mail)
  if (!subscription) {
    res
      .status(201)
      .json({ user: email, subscription: "starter", verificationToken });
    return;
  }
  res.status(201).json({ user: email, subscription, verificationToken });
};
module.exports = register;
