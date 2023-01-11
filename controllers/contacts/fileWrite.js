const fs=require("fs/promises")
const filePath = "./models/contacts.json"
const updateContacts = async(contacts)=> {
    await fs.writeFile(filePath, JSON.stringify(contacts));
}

module.exports = updateContacts;