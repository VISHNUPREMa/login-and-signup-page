const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/",userController.loadUserHome)
router.get("/viewprofile",userController.viewProfile)
router.get("/editprofile",userController.editProfileLoad);
router.post("/editprofile",userController.editProfile)





module.exports = router;
