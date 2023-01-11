// const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');
const contacts = require('../models/contacts.json')
const listContacts = async () => {return contacts}
const fileWrite=require("../controllers/contacts/fileWrite")

const getContactById = async (contactId) => {
  const [res]=contacts.filter(item=>item.id===contactId)
  return res
}

const removeContact = async (contactId) => {
  const idx=contacts.findIndex(item=>item.id===contactId)
  if(idx === -1){
    return null;
}
   const [removeProduct] = contacts.splice(idx, 1);
   await fileWrite(contacts)
   return removeProduct
    
}

const addContact = async (body) => {
   const {name, email, phone}=body
  const newObject={
    id:uuidv4(),
    name, 
    email, 
    phone
  }
  contacts.push(newObject)
  await fileWrite(contacts)
  console.log(contacts)
  return newObject
}

const updateContact = async (contactId, body) => {
  const idx = contacts.findIndex(item => item.id === contactId);
  if(idx === -1){
    return null;
}
contacts[idx] = {...contacts[idx],...body};
await fileWrite(contacts)
return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
