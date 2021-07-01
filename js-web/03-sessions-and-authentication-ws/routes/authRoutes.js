const express = require("express");
const authController = require("../controllers/authController");
const { guestAccess, getUserStatus } = require("../controllers/authController");

const router = express.Router();

router.get("/signup", guestAccess, getUserStatus, authController.cubicle_register_get);
router.post("/signup", authController.cubicle_register_post);
router.get("/login", guestAccess, getUserStatus, authController.cubicle_login_get);
router.post("/login", authController.cubicle_login_post);

module.exports = router;