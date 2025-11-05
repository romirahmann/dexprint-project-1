var express = require("express");
var router = express.Router();
const upload = require("../../services/upload.service").default;

const UserController = require("../../controllers/master_controller/UserController");
const ProfileController = require("../../controllers/master_controller/ProfileController");
const ClientController = require("../../controllers/master_controller/ClientController");

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

// COMPANY PROFILE
router.get("/clients", ClientController.getAllClient);
router.get("/client/:id", ClientController.getClientById);
router.post("/client", upload.single("logo"), ClientController.createClient);
router.put("/client/:id", ClientController.updateClient);
router.delete("/client/:id", ClientController.deleteClient);
router.get("/file/:filename", ClientController.getClientFile);

module.exports = router;
