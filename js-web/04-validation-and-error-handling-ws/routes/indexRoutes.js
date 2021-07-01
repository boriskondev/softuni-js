const express = require("express");
const indexController = require("../controllers/indexController");
const { getUserStatus } = require("../controllers/authController");

const router = express.Router();

router.get("/", getUserStatus, indexController.cubicle_index);
router.get("/logout", indexController.cubicle_logout);
router.get("/about", getUserStatus, indexController.cubicle_about);

module.exports = router;