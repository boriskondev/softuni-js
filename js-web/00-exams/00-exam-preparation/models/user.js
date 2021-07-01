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
    likedPlays: [{
        type: "ObjectId",
        ref: "Play"
    }]
}, {timestamps: true })

module.exports = mongoose.model("User", UserSchema);