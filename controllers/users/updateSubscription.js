const Joi = require("joi");
const User = require("../../models/users");
const subsSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const updateSubscription = async(req, res, next) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const { error } = subsSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return
  }
  const result = await User.findByIdAndUpdate(id, {subscription}, { new: true });
  if (!result) {
    res.status(404).json({ message: `Contact with id ${id} not found` });
    return
  }
  res.status(200).json({ data: result });
};
module.exports = updateSubscription;
