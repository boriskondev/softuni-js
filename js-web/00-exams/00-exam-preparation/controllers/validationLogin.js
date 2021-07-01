const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
        .custom(async username => {
            const user = await User.findOne({ username: username });
            if (user === null) {
                throw new Error("Username does not exist.");
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

// body("name").isLength({min: 5}).withMessage("Name should be at least 5 characters long"),
// body("imageUrl").isURL().withMessage("The url should start with http:// or https://"),
// body("username").isAlphanumeric("en-GB").withMessage("Username should consist letters and digits only"),
// body("username").isLength({min: 5}).withMessage("Username should be at least 5 characters long"),
// body("password").isAlphanumeric("en-GB").withMessage("Password should consist letters and digits only"),
// body("username").isLength({min: 8}).withMessage("Password should be at least 8 characters long"),