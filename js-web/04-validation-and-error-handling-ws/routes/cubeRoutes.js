const express = require("express");
const cubeController = require("../controllers/cubeController");
const { authAccess, getUserStatus } = require("../controllers/authController");
const { cubeAndAccessoryValidator } = require("../middlewares/validators");

const router = express.Router();

router.get("/details/:id", getUserStatus, cubeController.cubicle_details)
router.get("/create", authAccess, getUserStatus, cubeController.cubicle_create_get);
router.post("/create", cubeAndAccessoryValidator, getUserStatus, cubeController.cubicle_create_post);
router.get("/edit/:id", getUserStatus, cubeController.cubicle_edit_get);
router.post("/edit/:id", getUserStatus, cubeController.cubicle_edit_post);
router.get("/delete/:id", getUserStatus, cubeController.cubicle_delete_get);
router.post("/delete/:id", getUserStatus, cubeController.cubicle_delete_post);

module.exports = router;