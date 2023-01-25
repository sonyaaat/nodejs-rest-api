const Joi = require("joi");
const Product = require("../../models/contacts");
const updateFavourite = async (req, res) => {
  const favSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const id = req.params.contactId;
  const { favorite } = req.body;
  if (!req.body) {
    res.status(404).json({ message: "missing fields" });
  }
  const { error } = favSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return;
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    res.status(404).json({ message: `Contact with id ${id} not found` });
    return;
  }
  res.status(200).json({ data: result });
};
module.exports = updateFavourite;
