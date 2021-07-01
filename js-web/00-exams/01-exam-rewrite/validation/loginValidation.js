const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = [

    body("username").isLength({min: 5}).withMessage("Username should be at least 5 characters long."),

    body("username").isAlphanumeric("en-GB").withMessage("Username should consist English letters and digits only"),

    body("username")
        .custom(async username => {
            const user = await User.findOne({ username: username });
            if (user === null) {
                throw new Error("Username does not exist.");
            }
            return true;
        }),

    body("password").isLength({min: 5}).withMessage("Password should be at least 5 characters long."),

    body("password").isAlphanumeric("en-GB").withMessage("Password should consist English letters and digits only"),

    body("password")
        .custom(async (password, { req }) => {
            const user = await User.findOne( { username: req.body.username } );
            const status = await bcrypt.compare(password, user.password);
            if (!status) {
                throw new Error("Wrong password.");
            }
            return true;
        })

]