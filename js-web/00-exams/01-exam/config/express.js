const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

module.exports = (app) => {
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.set("view engine", "ejs");
    app.use("/static", express.static("static"));
    app.use(morgan("dev"));
};