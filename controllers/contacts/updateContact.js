
const Joi = require("joi");
const Product=require("../../models/contacts")

const updateContactScema = Joi.object({
  name: Joi.string().min(5).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(8).max(15),
});
const updateContact = async (req, res) => {
  const {id:userId}=req.user
  const id = req.params.contactId;
  if (!req.body) {
    res.status(404).json({message: "missing fields"})
  }
  const { error } = updateContactScema.validate(req.body);
  if (error) {
    res.status(404).json({message: error.message})
    return
  }
  const result = await Product.findOneAndUpdate({_id:id,owner:userId},{...req.body},{new:true})
  if (!result) {
    res.status(404).json({message: `Contact with id ${id} not found`})
    return
  }
  res.status(200).json({ data: result });
};
module.exports = updateContact;
