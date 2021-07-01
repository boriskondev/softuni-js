const express = require("express");
const fs = require("fs");
const Cube = require("../models/cube");
const cubicleController = require("../controllers/cubicleController")

const router = express.Router();

router.get("/", cubicleController.cubicle_index);
router.get("/details/:id", cubicleController.cubicle_details)
router.get("/about", cubicleController.cubicle_about);
router.get("/create", cubicleController.cubicle_create_get);
router.post("/create", cubicleController.cubicle_create_post);

module.exports = router;