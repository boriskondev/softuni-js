const express = require("express");
const morgan = require("morgan");

// Express app
const app = express();

// Register view engine
app.set("view engine", "ejs");

// Listen for requests
app.listen(3000);

// Middleware and static files (files we wre gonna make public - css, images, texts and so on)
app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    const blogs = [
        { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet" },
        { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet" },
        { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet" },
    ];
    res.render("index", { title: "Home", blogs } );
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About" } );
})

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new blog" } )
})

// 404 page
app.use((req, res) => {
    res.status(404);
    res.render("404", { title: "404" } );
})