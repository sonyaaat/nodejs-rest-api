const express = require("express");
const auth=require("../../middlewares/auth")
const router = express.Router();
const getCurrent=require("../../controllers/users/getCurrent")
const updateSubscription=require("../../controllers/users/updateSubscription")
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
router.get("/current",auth,ctrlWrapper(getCurrent))
router.patch("/",auth,ctrlWrapper(updateSubscription))
module.exports =router