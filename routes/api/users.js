const express = require("express");
const auth=require("../../middlewares/auth")
const verify=require("../../controllers/users/verify")
const resetPas=require('../../controllers/users/resetPas')
const upload=require("../../middlewares/multer")
const uploadAvatars=require("../../controllers/avatars/uploadAvatars")
const confirmEmail=require("../../controllers/users/confirmMail")
const confirmedToken=require("../../controllers/users/confirmedToken")
const secondVerify=require("../../controllers/users/secondVerify")
const router = express.Router();

const getCurrent=require("../../controllers/users/getCurrent")
const updateSubscription=require("../../controllers/users/updateSubscription")
const ctrlWrapper = require("../../middlewares/ctrlWrapper");


router.get("/current",auth,ctrlWrapper(getCurrent))
router.patch("/",auth,ctrlWrapper(updateSubscription))
router.patch("/avatars",auth,upload.single("avatar"),ctrlWrapper(uploadAvatars))
router.get("/verify/:verificationToken",ctrlWrapper(verify))
router.post("/verify",ctrlWrapper(secondVerify))
router.post("/confirmEmail",ctrlWrapper(confirmEmail))
router.get("/confirmEmail/:confirmationToken",ctrlWrapper(confirmedToken))
router.post("/resetPassword",ctrlWrapper(resetPas))

module.exports =router