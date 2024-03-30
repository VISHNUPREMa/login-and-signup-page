const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/",userController.loginPageLoad);
router.post("/",userController.logUser)
router.get("/register",userController.registerPageLoad)
router.post("/register",userController.insertUser)
router.get("/logout",userController.logoutUser)










module.exports = router;