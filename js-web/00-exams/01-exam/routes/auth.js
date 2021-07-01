const { Router } = require("express");
const { saveUser, verifyUser, checkGuestAccess, getUserStatus } = require("../controllers/user");
const { validationResult } = require("express-validator");
const validationRegister = require("../controllers/validationRegister");
const validationLogin = require("../controllers/validationLogin");

const router = Router();

router.get("/register", checkGuestAccess, getUserStatus, (req,res) => {
    res.render("register", {
        isLoggedIn: req.isLoggedIn,
        errorMessages: [],
        username: "",
        password: "",
        repeatPassword: ""
    })
})

router.post("/register", getUserStatus, validationRegister, async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("register", {
            isLoggedIn: req.isLoggedIn,
            errorMessages: errors.array()[0].msg,
            username,
            password,
            repeatPassword
        })
    }

    try {
        await saveUser(req, res);
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("register");
    }
})

router.get("/login", checkGuestAccess, getUserStatus, (req,res) => {
    res.render("login", {
        isLoggedIn: req.isLoggedIn,
        errorMessages: [],
        username: "",
        password: ""
    })
})

router.post("/login", getUserStatus, validationLogin, async (req,res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("login", {
            isLoggedIn: req.isLoggedIn,
            errorMessages: errors.array()[0].msg,
            username,
            password
        })
    }

    const status = await verifyUser(req, res);

    if (status) {
        return res.redirect("/");
    }

    res.render("login", {
        isLoggedIn: req.isLoggedIn,
        errorMessages: "Wrong username of password."
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("aid");
    res.redirect("/");
})

module.exports = router;