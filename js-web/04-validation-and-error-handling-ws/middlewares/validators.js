const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function checkIfDesiredUsernameExists(username) {
    const user = await User.findOne({ username: username });
    if (user !== null) {
        throw new Error("Username is already taken.");
    }
    return true;
}

function checkIfPasswordsMatch(repeatPassword, { req }) {
    if (repeatPassword !== req.body.password) {
        throw new Error("Passwords do not match.");
    }
    return true;
}


const registerValidator = [
        body("username").custom(checkIfDesiredUsernameExists),
        body("username").isAlphanumeric("en-GB").withMessage("Username should consist letters and digits only"),
        body("username").isLength({min: 5}).withMessage("Username should be at least 5 characters long"),
        body("password").isAlphanumeric("en-GB").withMessage("Password should consist letters and digits only"),
        body("username").isLength({min: 8}).withMessage("Password should be at least 8 characters long"),
        body("repeatPassword").custom(checkIfPasswordsMatch)
    ]

async function checkIfLoggedUsernameExists(username) {
    const user = await User.findOne({ username: username });
    if (user === null) {
        throw new Error("Username does not exist.");
    }
    return true;
}

async function checkIsPasswordIsCorrect(password, { req }) {
    const user = await User.findOne( { username: req.body.username } );
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
        throw new Error("Wrong password.");
    }
}

const loginValidator = [
    body("username").custom(checkIfLoggedUsernameExists),
    body("password").custom(checkIsPasswordIsCorrect),
]

const cubeAndAccessoryValidator = [
    //body("name").not().isEmpty().withMessage("Name is required."),
    body("name").matches(/^[\w\s]+$/).withMessage("Name should consist of letters, digits and whitespaces only"),
    body("name").isLength({min: 5}).withMessage("Name should be at least 5 characters long"),
    body("imageUrl").isURL().withMessage("The url should start with http:// or https://")
]


module.exports = {
    registerValidator,
    loginValidator,
    cubeAndAccessoryValidator
}