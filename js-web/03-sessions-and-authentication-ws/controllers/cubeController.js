const Cube = require("../models/cube");
const jwt = require("jsonwebtoken");
const privateKey = "CUBE-WORKSHOP-SOFTUNI";

const cubicle_details = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id).populate("accessories");

    const token = req.cookies["aid"];

    try {
        const decodedObject = jwt.verify(token, privateKey);
        req.isCreator = decodedObject.userID === cube.creatorID.toString();
    } catch (e) {
        req.isCreator = false;
    }


    res.render("details", {
        title: "Details",
        cube,
        isLoggedIn: req.isLoggedIn,
        isCreator: req.isCreator
    })
}

const cubicle_create_get = (req, res) => {
    res.render("create", {
        title: "Create",
        isLoggedIn: req.isLoggedIn
    });
}

const cubicle_create_post = (req, res) => {
    const { name, description, imageUrl, difficulty } = req.body;

    const token = req.cookies["aid"];
    const decodedObject = jwt.verify(token, privateKey);

    const cube = new Cube({ name, description, imageUrl, difficulty, creatorID: decodedObject.userID });

    cube.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
}

const cubicle_edit_get = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id);

    res.render("editCube", {
        title: "Edit",
        cube,
        isLoggedIn: req.isLoggedIn
    });
}

const cubicle_edit_post = async (req, res) => {
    const id = req.params.id;

    const {name, description, imageUrl, difficulty} = req.body;

    await Cube.findByIdAndUpdate(id, {
        "$set": {
            name,
            description,
            imageUrl,
            difficulty
        }
    });

    res.redirect("/");
}

const cubicle_delete_get = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id);


    res.render("deleteCube", {
        title: "Delete",
        cube,
        isLoggedIn: req.isLoggedIn
    });
}

const cubicle_delete_post = async (req, res) => {
    const id = req.params.id;
    await Cube.findByIdAndDelete(id);
    res.redirect("/");
}

module.exports = {
    cubicle_create_get,
    cubicle_create_post,
    cubicle_details,
    cubicle_edit_get,
    cubicle_edit_post,
    cubicle_delete_get,
    cubicle_delete_post
}