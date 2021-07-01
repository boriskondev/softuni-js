const { body } = require("express-validator");
const User = require("../models/user");

module.exports = [

    body("username").isLength({min: 5}).withMessage("Username should be at least 5 characters long."),

    body("username").isAlphanumeric("en-GB").withMessage("Username should consist English letters and digits only"),

    body("username")
        .custom(async (username) => {
            const user = await User.findOne({ username: username });
            if (user !== null) {
                throw new Error("Username is already taken.");
            }
            return true;
        }),

    body("password").isLength({min: 5}).withMessage("Password should be at least 5 characters long."),

    body("password").isAlphanumeric("en-GB").withMessage("Password should consist English letters and digits only"),

    body("repeatPassword")
        .custom(async (repeatPassword, { req } ) => {
            if (repeatPassword !== req.body.password) {
                throw new Error("The repeat password should be equal to the password.");
            }
            return true;
        })
]