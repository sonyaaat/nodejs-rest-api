const { Conflict } = require("http-errors");
const Joi = require("joi");
const User = require("../../models/users");
const bcrypt=require("bcryptjs")
const usersSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).max(20).required(),
  subscription: Joi.string()
});
const register = async (req, res, next) => {
  const { error } = usersSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
  }
  const { subscription, email, password } = req.body;
  const user = await User.find({ email });
  if (!user) {
    throw new Conflict(`User with email ${email}  already exists`);
  }
  const hashPassword=bcrypt.hashSync(password,bcrypt.genSaltSync(10))
  await User.create({ subscription, email, password:hashPassword });
  if (!subscription) {
    res.status(201).json({ user: email, subscription: "starter" });
    return;
  }
  res.status(201).json({ user: email, subscription });
};
module.exports = register;
