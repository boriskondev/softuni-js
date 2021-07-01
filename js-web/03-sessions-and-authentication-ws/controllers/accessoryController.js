const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

const cubicle_create_accessory_get = (req, res) => {
    res.render("createAccessory", {
        title: "Create accessory",
        isLoggedIn: req.isLoggedIn
    });
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

const cubicle_attach_accessory_get = async (req, res) => {
    const id = req.params.id;
    const cube = await Cube.findById(id);
    const accessories = await Accessory.find();
    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString());

    const notAttachedAccessories = accessories.filter(acc => {
        const accessoryString = acc._id.valueOf().toString();
        return !cubeAccessories.includes(accessoryString);
    })

    res.render("attachAccessory", {
        title: "Attach New Accessory",
        cube,
        accessories: notAttachedAccessories,
        isLoggedIn: req.isLoggedIn
    })
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
    cubicle_create_accessory_get,
    cubicle_create_accessory_post,
    cubicle_attach_accessory_get,
    cubicle_attach_accessory_post
}