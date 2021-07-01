const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cubicleRoutes = require("./routes/cubicleRoutes");
const Cube = require("./models/cube")

const app = require("express")();

// Connect to mongoDB
const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "nodejs-softuni"

const dbURI = `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Mongo DB connected."))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", cubicleRoutes);

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});

app.listen(config.port, () => {
    console.log(`The server is ready and listening on port ${config.port}! Now it is up to you...`)
});

// https://youtu.be/ycxewU3UptE?t=3794

