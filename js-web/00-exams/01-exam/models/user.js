const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: "ObjectId",
        ref: "Course"
    }]
}, {timestamps: true })

module.exports = mongoose.model("User", UserSchema);