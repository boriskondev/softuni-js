const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const express = require("express");
const morgan = require("morgan");
const cubicleRoutes = require("./routes/cubicleRoutes");

const app = require("express")();

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
