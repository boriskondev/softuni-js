const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types; 

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    usersEnrolled: [{
        type: ObjectId,
        ref: "User"
    }],
    creator: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true })

module.exports = mongoose.model("Course", CourseSchema);
