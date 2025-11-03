var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controller/UserController");
const ProfileController = require("../../controllers/master_controller/ProfileController");

// USER ROUTES
router.get("/users", UserController.getAllUser);
router.get("/user/:id", UserController.getUserByID);
router.post("/user", UserController.register);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deletedUser);

// COMPANY PROFILE
router.get("/profile", ProfileController.getAllCompany);
router.get("/profile/:id", ProfileController.getCompanyById);
router.post("/profile", ProfileController.createCompany);
router.put("/profile/:id", ProfileController.updateCompany);
router.delete("/profile/:id", ProfileController.deleteCompany);

module.exports = router;
