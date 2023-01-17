const express = require("express");
const contacts = require("../../controllers/index");
const router = express.Router();
const ctrlWrapper = require("../../middlewares/ctrlWrapper");

router.get("/", ctrlWrapper(contacts.listContacts));

router.get("/:contactId", ctrlWrapper(contacts.getContactById));

router.post("/", ctrlWrapper(contacts.addContact));

router.delete("/:contactId", ctrlWrapper(contacts.removeContact));

router.put("/:contactId", ctrlWrapper(contacts.updateContact));

router.patch("/:contactId/favorite",ctrlWrapper(contacts.updateFavourite))

module.exports = router;
