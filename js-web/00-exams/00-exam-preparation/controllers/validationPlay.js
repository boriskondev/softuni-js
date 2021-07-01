const { body } = require('express-validator');
 
module.exports = [
    body("title").not().isEmpty().withMessage("Title is required."),
    body("description").not().isEmpty().withMessage("Description is required."),
    body("description").isLength({max: 50}).withMessage("Maximum allowed length of description is 50 characters."),
    body("imageUrl").not().isEmpty().withMessage("Image url is required.")
]
