const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");



router.get("/",adminController.loadAdminHome);
router.get("/edituser",adminController.editUserLoad)
router.post("/edituser",adminController.editUser)
router.get("/deleteuser",adminController.deleteUser)
router.post('/search',adminController.searchUser)
router.get("/createuser",adminController.createUserLoad)
router.post("/createuser",adminController.createUser)






module.exports = router