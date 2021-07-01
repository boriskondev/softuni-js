const express = require("express");
const accessoryController = require("../controllers/accessoryController");
const { authAccess, getUserStatus } = require("../controllers/authController");
const { cubeAndAccessoryValidator } = require("../middlewares/validators");

const router = express.Router();

router.get("/create/accessory", authAccess, getUserStatus, accessoryController.cubicle_create_accessory_get);
router.post("/create/accessory", cubeAndAccessoryValidator, getUserStatus, accessoryController.cubicle_create_accessory_post);
router.get("/attach/accessory/:id", authAccess, getUserStatus, accessoryController.cubicle_attach_accessory_get);
router.post("/attach/accessory/:id", getUserStatus, accessoryController.cubicle_attach_accessory_post);

module.exports = router;