const Cube = require("../models/cube");

const cubicle_index = async (req, res) => {
    const cubes = await Cube.find();
    res.render("index", {
        title: "Home",
        cubes,
        isLoggedIn: req.isLoggedIn,
        errors: []
    })
}

const cubicle_logout = async (req, res) => {
    res.clearCookie("aid");
    res.redirect("/");
}

const cubicle_about = (req, res) => {
    res.render("about", {
        title: "About",
        isLoggedIn: req.isLoggedIn,
        errors: []
    });
}

module.exports = {
    cubicle_index,
    cubicle_logout,
    cubicle_about
}