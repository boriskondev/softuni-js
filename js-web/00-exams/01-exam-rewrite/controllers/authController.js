const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, config.development.privateKey, {
        expiresIn: maxAge
    });
};

const register_get = (req, res) => {
    res.render("register", {
        error: []
    });
}

const register_post = async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("register", {
            error: errors.array()[0].msg
        })
    }

    try {
        const user = await User.create({ username, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect("/");
    } catch (err) {
        res.redirect("/register");
    }
}

const login_get = (req, res) => {
    res.render("login", {
        error: []
    });
}

const login_post = async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("login", {
            error: errors.array()[0].msg
        })
    }

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect("/");
    }
    catch (err) {
        res.redirect("/login");
    }
}

const logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
}

module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout_get
};