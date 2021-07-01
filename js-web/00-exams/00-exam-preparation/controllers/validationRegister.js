const { body } = require("express-validator");
const User = require("../models/user");

module.exports = [

    body("username")
        .custom((value) => {
            const regex = /[A-Za-z0-9]+/g;
            if( value < 3 || !value.match(regex)) {
                throw new Error ("The username should be at least 3 characters long and should consist only english letters and digits")
            }
            return true;
        }),

    body("username")
        .custom(async (username) => {
            const user = await User.findOne({ username: username });
            if (user !== null) {
                throw new Error("Username is already taken.");
            }
            return true;
        }),

    body("password")
        .custom((value) => {
            const regex = /[A-Za-z0-9]+/g;
            if( value < 3 || !value.match(regex)) {
                throw new Error ("The password should be at least 3 characters long and should consist only english letters and digits")
            }
            return true;
        }),

    body("repeatPassword")
        .custom(async (repeatPassword, { req } ) => {
            if (repeatPassword !== req.body.password) {
                throw new Error("Passwords do not match.");
            }
            return true;
        })
]

// body("name").matches(/^[\w\s]+$/).withMessage("Name should consist of letters, digits and whitespaces only"),
// body("name").isLength({min: 5}).withMessage("Name should be at least 5 characters long"),
// body("imageUrl").isURL().withMessage("The url should start with http:// or https://"),
// body("username").isAlphanumeric("en-GB").withMessage("Username should consist letters and digits only"),
// body("username").isLength({min: 5}).withMessage("Username should be at least 5 characters long"),
// body("password").isAlphanumeric("en-GB").withMessage("Password should consist letters and digits only"),
// body("username").isLength({min: 8}).withMessage("Password should be at least 8 characters long"),