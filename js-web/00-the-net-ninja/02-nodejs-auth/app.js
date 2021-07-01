const express = require("express");
const mongoose = require("mongoose");
const authController = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// view engine
app.set("view engine", "ejs");

// database connection
const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "nodejs-auth"

const dbURI = `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));


// routes
app.get('*', checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authController)