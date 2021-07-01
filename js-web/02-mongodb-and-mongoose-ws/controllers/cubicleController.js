const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

const cubicle_index = async (req, res) => {
    const cubes = await Cube.find();
    res.render("index", { title: "Home", cubes });
}

const cubicle_create_get = (req, res) => {
    res.render("create", { title: "Create" });
}

const cubicle_create_post = (req, res) => {
    const cube = new Cube(req.body);
    cube.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
}

const cubicle_create_accessory_get = (req, res) => {
    res.render("createAccessory", { title: "Create accessory" });
}

const cubicle_create_accessory_post = (req, res) => {
    const accessory = new Accessory(req.body);
    accessory.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/create/accessory");
        }
    })
}

const cubicle_about = (req, res) => {
    res.render("about", { title: "About" });
}

const cubicle_details = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id).populate("accessories");

    res.render("details", { title: "Details", cube })
}

const cubicle_attach_accessory_get = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id);
    const accessories = await Accessory.find();
    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString());

    const notAttachedAccessories = accessories.filter(acc => {
        const accessoryString = acc._id.valueOf().toString();
        return !cubeAccessories.includes(accessoryString);
    })

    res.render("attachAccessory", { title: "Attach New Accessory", cube,  accessories: notAttachedAccessories })
}

const cubicle_attach_accessory_post = async (req, res) => {
    const id = req.params.id;
    const {accessory} = (req.body);

    await Cube.findByIdAndUpdate(id, {
        $addToSet: {accessories: [accessory]}
    })

    res.redirect("back");
}

module.exports = {
    cubicle_index,
    cubicle_create_get,
    cubicle_create_post,
    cubicle_create_accessory_get,
    cubicle_create_accessory_post,
    cubicle_about,
    cubicle_details,
    cubicle_attach_accessory_get,
    cubicle_attach_accessory_post
}