const express = require("express");
const authController = require("../controllers/authController");
const { guestAccess, getUserStatus } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../middlewares/validators");

const router = express.Router();

router.get("/signup", guestAccess, getUserStatus, authController.cubicle_register_get);
router.post("/signup", registerValidator, authController.cubicle_register_post);
router.get("/login", guestAccess, getUserStatus, authController.cubicle_login_get);
router.post("/login", loginValidator, authController.cubicle_login_post);

module.exports = router;