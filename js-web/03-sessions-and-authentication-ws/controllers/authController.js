const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const privateKey = "CUBE-WORKSHOP-SOFTUNI";

const generateToken = (data) => {
    const token = jwt.sign(data, privateKey);
    return token
}

// Used to protect routes
const authAccess = (req, res, next) => {
    const token = req.cookies["aid"];

    if (!token) {
        res.redirect("/");
    } else {
        try {
            jwt.verify(token, privateKey);
            next();
        } catch (e) {
            res.redirect("/");
        }
    }
}

// Guest access
const guestAccess = (req, res, next) => {
    const token = req.cookies["aid"];

    if (token) {
        res.redirect("/");
    } else {
        next();
    }
}

// Checks if user is loggen in or not
const getUserStatus = (req, res, next) => {
    const token = req.cookies["aid"];

    if (!token) {
        req.isLoggedIn = false;
    } else {
        try {
            jwt.verify(token, privateKey);
            req.isLoggedIn = true;
        } catch (e) {
            req.isLoggedIn = false;
        }
    }
    next();
}

const cubicle_register_get = async (req, res) => {
    res.render("registerPage", {
        title: "Register",
        isLoggedIn: req.isLoggedIn
    });
}

const cubicle_register_post = async (req, res) => {
    const { username, password } = req.body;

    // Hashing
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashedPassword
    });

    const userObject = await user.save();

    // Generating token
    const token = generateToken({
        userID: userObject._id,
        username: userObject.username
    });

    // Storing token in cookie
    res.cookie("aid", token);

    res.redirect("/");
}

const cubicle_login_get = (req, res) => {
    res.render("loginPage", {
        title: "Login",
        isLoggedIn: req.isLoggedIn
    });
}

const cubicle_login_post = async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne( { username } );
   const status = await bcrypt.compare(password, user.password);

   if (status) {
       const token = generateToken({
           userID: user._id,
           username: user.username
       });

       res.cookie("aid", token);

       res.redirect("/");
   }
}

module.exports = {
    authAccess,
    guestAccess,
    getUserStatus,
    cubicle_register_get,
    cubicle_register_post,
    cubicle_login_get,
    cubicle_login_post
}
