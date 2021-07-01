const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// Express app
const app = express();

// Connect to mongoDB
const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "nodejs-mongo-tutorials"

const dbURI = `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Middleware and static files (files we wre gonna make public - css, images, texts and so on)
app.use(express.static("public"));
// Takes all the urlencoded data and parses it into an object we can use on the request object
// https://stackoverflow.com/questions/55692084/what-is-the-difference-between-nodes-bodyparser-and-expresss-urlencoded-middle
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
})

app.get("/about", (req, res) => {
    res.render("about", { title: "About" } );
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404);
    res.render("404", { title: "404" } );
});

// // Mongoose and Mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//     const blog = new Blog({
//         title: "Boris learns NodeJS, day 2",
//         snippet: "It is getting interesting",
//         body: "I should code all day and night in order to catch up..."
//     });
//
//     // Save new entry to db
//     blog.save()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })
//
// // Get all entries from db
// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })
//
// // Get a single entry
// app.get("/single-blog", (req, res) => {
//     Blog.findById("5f78dc00a92de42d3875ac27")
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })