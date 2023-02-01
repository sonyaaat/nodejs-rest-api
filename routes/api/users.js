const express = require("express");
const auth=require("../../middlewares/auth")
const upload=require("../../middlewares/multer")
const uploadAvatars=require("../../controllers/avatars/uploadAvatars")

const router = express.Router();

const getCurrent=require("../../controllers/users/getCurrent")
const updateSubscription=require("../../controllers/users/updateSubscription")
const ctrlWrapper = require("../../middlewares/ctrlWrapper");


router.get("/current",auth,ctrlWrapper(getCurrent))
router.patch("/",auth,ctrlWrapper(updateSubscription))
router.patch("/avatars",auth,upload.single("avatar"),ctrlWrapper(uploadAvatars))
module.exports =router