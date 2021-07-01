const { validationResult } = require("express-validator");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const home_get = async (req, res) => {
    let courses = await Course.find();

    try {
        const token = req.cookies.jwt;
        await jwt.verify(token, config.development.privateKey);
        courses.sort((a, b) => a.createdAt - b.createdAt);
    } catch (e) {
        console.log(e);
        courses = courses.sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length).slice(0, 3);
    } finally {
        res.render("home", {
            courses,
            error: []
        });
    }
}

const create_get = async (req, res) => {
    res.render("create", {
        error: []
    });
}

const create_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("create", {
            error: errors.array()[0].msg
        })
    }

    try {
        const token = req.cookies.jwt;
        const decodedToken = await jwt.verify(token, config.development.privateKey);
        const { title, description, imageUrl, duration } = req.body;
        const course = new Course({
            title,
            description,
            imageUrl,
            duration,
            creator: decodedToken.id
        });
        await course.save();
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}

const details_get = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id);

    try {
        const token = req.cookies.jwt;
        const decodedToken = await jwt.verify(token, config.development.privateKey);
        const isCreator = course.creator.toString() === decodedToken.id.toString();
        const isEnrolled = course.usersEnrolled.filter(x => x.toString() === decodedToken.id.toString());
        res.render("details", {
            course,
            error: [],
            isCreator,
            isEnrolled: isEnrolled.length !== 0
        });
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}

const enroll_get = async (req, res) => {
    const id = req.params.id;

    try {
        const token = req.cookies.jwt;
        const decodedToken = await jwt.verify(token, config.development.privateKey);
        await Course.findByIdAndUpdate((id), {
            $addToSet: { usersEnrolled: [decodedToken.id] }
        })

        res.redirect(`/details/${id}`);

    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}

const edit_get = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id);

    try {
        const token = req.cookies.jwt;
        const decodedToken = await jwt.verify(token, config.development.privateKey);

        res.render("edit", {
            course,
            error: []
        });
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}

const edit_post = async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("create", {
            error: errors.array()[0].msg
        })
    }

    try {
        const {title, description, imageUrl, duration} = req.body;

        await Course.findByIdAndUpdate(id, {
            "$set": {
                title,
                description,
                imageUrl,
                duration
            }
        })
        res.redirect(`/details/${id}`)
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}

const delete_get = async (req, res) => {
    const id = req.params.id;

    try {
        await Course.findByIdAndDelete(id);
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
}

module.exports = {
    home_get,
    create_get,
    create_post,
    details_get,
    enroll_get,
    edit_get,
    edit_post,
    delete_get
};
