const { body } = require("express-validator");
 
module.exports = [
    body("title").not().isEmpty().withMessage("Title is required."),
    body("title").isLength({min: 4}).withMessage("Title should be at least 4 characters."),
    body("description").not().isEmpty().withMessage("Description is required."),
    body("description").isLength({min: 20}).withMessage("Description should be at least 20 characters long."),
    body("imageUrl").not().isEmpty().withMessage("Image url is required."),
    body("imageUrl").isURL().withMessage("Image url should start with http:// or https://"),
    body("duration").not().isEmpty().withMessage("Duration is required.")
]
