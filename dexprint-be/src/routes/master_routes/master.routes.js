var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controller/UserController");

// USER ROUTES
router.get("/users", UserController.getAllUser);
router.get("/user/:id", UserController.getUserByID);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deletedUser);

// COMPANY PROFILE

module.exports = router;
