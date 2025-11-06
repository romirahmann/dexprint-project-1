var express = require("express");
var router = express.Router();
const upload = require("../../services/upload.service").default;

const UserController = require("../../controllers/master_controller/UserController");
const ProfileController = require("../../controllers/master_controller/ProfileController");
const ClientController = require("../../controllers/master_controller/ClientController");

const ReviewController = require("../../controllers/master_controller/ReviewController");
const HeroController = require("../../controllers/master_controller/HeroController");
const CategoriesController = require("../../controllers/master_controller/CategoriesController");
const MaterialController = require("../../controllers/master_controller/MaterialController");
const ProductController = require("../../controllers/master_controller/ProductController");
const { getFile } = require("../../services/file.service");

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

// === REVIEW ROUTES ===
router.get("/reviews", ReviewController.getAllReview);
router.get("/review/:id", ReviewController.getReviewById);
router.post("/review", upload.single("fileIMG"), ReviewController.createReview);
router.put(
  "/review/:id",
  upload.single("fileIMG"),
  ReviewController.updateReview
);
router.delete("/review/:id", ReviewController.deleteReview);
router.get("/file/:filename", ReviewController.getReviewFile);

// === HERO ROUTES ===
router.get("/heros", HeroController.getAllHero);
router.get("/hero/:id", HeroController.getHeroById);
router.post("/hero", upload.array("files", 10), HeroController.createHero);
router.put("/hero/:id", upload.single("file"), HeroController.updateHero);
router.delete("/hero/:id", HeroController.deleteHero);
router.get("/hero/file/:filename", HeroController.getHeroFile);

// === CATEGORY ROUTES ===
router.get("/categories", CategoriesController.getAllCategory);
router.get("/category/:id", CategoriesController.getCategoryById);
router.post("/category", CategoriesController.createCategory);
router.put("/category/:id", CategoriesController.updateCategory);
router.delete("/category/:id", CategoriesController.deleteCategory);

// === MATERIAL ROUTES ===
router.get("/materials", MaterialController.getAllMaterial);
router.get("/material/:id", MaterialController.getMaterialById);
router.get(
  "/materials/product/:productId",
  MaterialController.getMaterialByProductId
);
router.post("/material", MaterialController.createMaterial);
router.put("/material/:id", MaterialController.updateMaterial);
router.delete("/material/:id", MaterialController.deleteMaterial);

// === PRODUCT ROUTES ===
router.get("/products", ProductController.getAllProduct);
router.get("/product/:id", ProductController.getProductById);
router.post("/product", upload.single("file"), ProductController.createProduct);
router.put(
  "/product/:id",
  upload.single("file"),
  ProductController.updateProduct
);
router.delete("/product/:id", ProductController.deleteProduct);

// FILE
router.get("/image/:filename", getFile);

module.exports = router;
