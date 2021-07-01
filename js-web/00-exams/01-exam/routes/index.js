const { Router } = require("express");
const { validationResult } = require("express-validator");
const { checkGuestAccess, getUserStatus, checkAuthentication } = require("../controllers/user");
const validationCourse = require("../controllers/validationCourse");
const { getCourse, getAllCourses, sortByEnrolledUsers, sortByDateCreated, } = require("../controllers/course")
const Course = require("../models/course");

const router = Router();

router.get("/", checkAuthentication, getUserStatus, async (req, res) => {
    const { username } = req.user;
    const coursesGuest = await sortByEnrolledUsers(); // Must be top 3
    const coursesLogged = await sortByDateCreated(); // All courses

    res.render("home", {
        isLoggedIn:  req.isLoggedIn,
        username: username,
        errorMessages: [],
        coursesGuest,
        coursesLogged
    });
})

router.get("/create", checkAuthentication, getUserStatus, validationCourse,(req, res) => {
    const { username } = req.user;

    res.render("create", {
        isLoggedIn:  req.isLoggedIn,
        username: username,
        errorMessages: [],
        title: "",
        description: "",
        imageUrl: "",
        duration: ""
    });
})

router.post("/create", checkAuthentication, getUserStatus, validationCourse, async (req, res) => {
    const { title, description, imageUrl, duration } = req.body;
    const { username } = req.user;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("create", {
            isLoggedIn: req.isLoggedIn,
            errorMessages: errors.array()[0].msg,
            username: username,
            title,
            description,
            imageUrl,
            duration
        })
    }

    try {
        const { title, description, imageUrl, duration } = req.body;
        const { _id } = req.user;
        const course = new Course({
            title,
            description,
            imageUrl,
            duration,
            creator: _id
        });
        await course.save();
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
})

router.get("/details/:id", checkAuthentication, getUserStatus, async (req, res) => {
    const { username } = req.user;
    // ADD TRY - CATCH
    const id = req.params.id;
    const course = await getCourse(id);
    console.log(course)
    const isCreator = course.creator.toString() === req.user._id.toString();
    const isEnrolled = course.usersEnrolled.filter(x => x.toString() === req.user._id.toString());

    res.render("details", {
        errorMessages: [],
        isLoggedIn: req.isLoggedIn,
        ...course,
        username: username,
        isCreator,
        isEnrolled: isEnrolled.length !== 0
    })
})

router.get("/enroll/:id", checkAuthentication, getUserStatus, async (req, res) => {
    const id = req.params.id;
    const { _id } = req.user;

    await Course.findByIdAndUpdate((id), {
        $addToSet: { usersEnrolled: [_id] }
    })

    res.redirect(`/details/${id}`)
})

router.get("/edit/:id", checkAuthentication, getUserStatus, async (req, res) => {
    const { username } = req.user;
    const id = req.params.id;
    const course = await getCourse(id);

    res.render("edit", {
        errorMessages: [],
        isLoggedIn: req.isLoggedIn,
        username: username,
        ...course
    })
})

router.post("/edit/:id", checkAuthentication, getUserStatus, validationCourse, async (req, res) => {
    const { username } = req.user;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("create", {
            isLoggedIn: req.isLoggedIn,
            errorMessages: errors.array()[0].msg,
            username: username,
        })
    }

    try {
        const id = req.params.id;
        const { title, description, imageUrl, duration } = req.body;

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
})

router.get("/delete/:id", checkAuthentication, getUserStatus, async (req, res) => {
    const id = req.params.id;
    await Course.findByIdAndDelete(id);
    res.redirect("/");
})

module.exports = router;