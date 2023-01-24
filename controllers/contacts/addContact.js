const Joi = require("joi");
const Product=require("../../models/contacts")
const contactsSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(8).max(15).required(),
  favorite:Joi.boolean()
});
const addContact = async (req, res) => {
  const {id}=req.user
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    res.status(404).json({message: error.message})
    return
  }
  const product=await Product.findOne({email:req.body.email,owner:id})
  if(product)
  {
    res.status(404).json({ message: `Contact with email ${req.body.email} already exists` });
    return
  }
  const result= await Product.create({...req.body,owner:id})
  if (!result) {
    res.status(404).json({ message: `Contact with id ${id} not found` });
    return
  }
  res.status(201).json({ data: result });
};
module.exports = addContact;
