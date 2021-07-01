const Cube = require("../models/cube");
const fs = require("fs");

const cubicle_index = (req, res) => {
    fs.readFile("./config/database.json", (err, data) => {
        if (err) {
            console.log(err);
        }

        const allCubes = JSON.parse(data.toString());

        res.render("index", { title: "Home", cubes: allCubes });
    })
}

const cubicle_create_get = (req, res) => {
    res.render("create", { title: "Create" });
}

const cubicle_create_post = (req, res) => {
    const { name, description, imageURL, difficulty } = req.body;
    const newCube = new Cube(name, description, imageURL, difficulty);
    newCube.save();

    res.redirect("/");
}

const cubicle_about = (req, res) => {
    res.render("about", { title: "About" });
}

const cubicle_details = (req, res) => {
    const id = req.params.id;

    fs.readFile("./config/database.json", (err, data) => {
        if (err) {
            console.log(err);
        }

        const allCubes = JSON.parse(data.toString());
        const cubeForDetails = allCubes.filter(cube => cube.id === id)[0];

        res.render("details", { title: "Details", cube: cubeForDetails })
    })
}

module.exports = {
    cubicle_index,
    cubicle_create_get,
    cubicle_create_post,
    cubicle_about,
    cubicle_details
}