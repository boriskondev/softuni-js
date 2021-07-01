const { Router } = require("express");
const { validationResult } = require("express-validator");
const { getUserStatus, checkAuthentication } = require("../controllers/user");
const validationPlay = require("../controllers/validationPlay");
const { getPlay, sortByDate, sortByLikes } = require("../controllers/play")
const Play = require("../models/play");

const router = Router();

router.get("/", getUserStatus, async (req, res) => {
    const playsGuest = await sortByLikes();
    const playsLogged = await sortByDate();

    res.render("home", {
    isLoggedIn:  req.isLoggedIn,
    errorMessages: [],
        playsGuest,
        playsLogged
    });    
})

router.get("/create", checkAuthentication, getUserStatus, (req, res) => {
    res.render("create", {
        isLoggedIn:  req.isLoggedIn,
        errorMessages: [],
        title: "",
        description: "",
        imageUrl: "",
    });
})

router.post("/create", checkAuthentication, getUserStatus, validationPlay, async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("create", {
            isLoggedIn: req.isLoggedIn,
            errorMessages: errors.array()[0].msg,
            title,
            description,
            imageUrl,
        })
    }

    try {
        const { title, description, imageUrl, isPublic } = req.body;
        const { _id } = req.user;
        const play = new Play({
            title,
            description,
            imageUrl,
            isPublic: isPublic === "on",
            creator: _id
        });
        await play.save();
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
})

router.get("/details/:id", checkAuthentication, getUserStatus, async (req, res) => {
    // ADD TRY - CATCH
    const id = req.params.id;
    const play = await getPlay(id);
    const isCreator = play.creator.toString() === req.user._id.toString();
    const isLiked = play.usersLiked.filter(x => x.toString() === req.user._id.toString());

    res.render("details", {
        errorMessages: [],
        isLoggedIn: req.isLoggedIn,
        ...play,
        isCreator,
        isLiked: isLiked.length !== 0
    })
})

router.get("/like/:id", checkAuthentication, getUserStatus, async (req, res) => {
    // ADD TRY - CATCH
    const id = req.params.id;
    const { _id } = req.user;

    await Play.findByIdAndUpdate((id), {
        $addToSet: { usersLiked: [_id] }
    })

    res.redirect(`/details/${id}`)
})

router.get("/edit/:id", checkAuthentication, getUserStatus, async (req, res) => {
    // ADD TRY - CATCH
    const id = req.params.id;
    const play = await getPlay(id);

    res.render("edit", {
        errorMessages: [],
        isLoggedIn: req.isLoggedIn,
        ...play
    })
})

router.post("/edit/:id", checkAuthentication, getUserStatus, async (req, res) => {
    // ADD TRY - CATCH
    const id = req.params.id;
    const { title, description, imageUrl, isPublic } = req.body;

    await Play.findByIdAndUpdate(id, {
        "$set": {
            title,
            description,
            imageUrl,
            isPublic: isPublic === "on",
        }
    })

    res.redirect("/");
})

router.get("/delete/:id", checkAuthentication, getUserStatus, async (req, res) => {
    const id = req.params.id;
    await Play.findByIdAndDelete(id);
    res.redirect("/");
})



module.exports = router;