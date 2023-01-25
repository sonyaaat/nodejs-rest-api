const express = require("express");
const {contacts} = require("../../controllers/index");
const auth=require("../../middlewares/auth")
const router = express.Router();
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

router.get("/", auth,ctrlWrapper(contacts.listContacts));

router.get("/:contactId",auth, ctrlWrapper(contacts.getContactById));

router.post("/", auth,ctrlWrapper(contacts.addContact));

router.delete("/:contactId",auth,ctrlWrapper(contacts.removeContact));

router.put("/:contactId", auth, ctrlWrapper(contacts.updateContact));

router.patch("/:contactId/favorite",ctrlWrapper(contacts.updateFavourite))

module.exports = router;
