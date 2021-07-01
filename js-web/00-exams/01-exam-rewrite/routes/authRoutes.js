const { Router } = require("express");
const authController = require("../controllers/authController");
const registerValidation = require("../validation/registerValidation");
const loginValidation = require("../validation/loginValidation");

const router = Router();

router.get("/register", authController.register_get);
router.post("/register", registerValidation, authController.register_post);
router.get("/login", authController.login_get);
router.post("/login", loginValidation, authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;