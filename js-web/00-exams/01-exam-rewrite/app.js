const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const app = require("express")();
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const mongoose = require("mongoose");

mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if (err) {
            console.error(err);
            throw err;
        }
    })  

require("./config/express")(app);

app.use("/", authRoutes);
app.use("/", courseRoutes);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));