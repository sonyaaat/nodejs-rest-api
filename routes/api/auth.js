const express = require("express");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const {auth}=require("../../controllers/index")
const authafication=require('../../middlewares/auth')

const router = express.Router();
router.post("/register",ctrlWrapper(auth.register))
router.post("/login",ctrlWrapper(auth.login))
router.post("/logout",authafication,ctrlWrapper(auth.logout))
module.exports=router