const listContacts=require("../contacts/listContacts")
const getContactById=require("../contacts/getContactById")
const addContact=require("./addContact")
const removeContact=require("./removeContact")
const updateContact=require("./updateContact")
const updateFavourite=require("./updateFavourite")
module.exports={listContacts,getContactById,addContact,removeContact,updateContact,updateFavourite}