const { Router } = require("express");
const courseController = require("../controllers/courseController")
const { checkUser, requireAuth } = require("../middleware/authMiddleware");
const courseValidation = require("../validation/courseValidation");

const router = Router();

router.get("/", checkUser, courseController.home_get);
router.get("/create", requireAuth, checkUser, courseController.create_get);
router.post("/create", requireAuth, checkUser, courseValidation, courseController.create_post);
router.get("/details/:id", requireAuth, checkUser, courseController.details_get);
router.get("/enroll/:id", requireAuth, checkUser, courseController.enroll_get);
router.get("/edit/:id", requireAuth, checkUser, courseController.edit_get);
router.post("/edit/:id", requireAuth, checkUser, courseValidation, courseController.edit_post);
router.get("/delete/:id", requireAuth, checkUser, courseController.delete_get);

module.exports = router;