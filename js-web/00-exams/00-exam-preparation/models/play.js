const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types; 

const PlaySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    isPublic: {
        type: Boolean,
        default: false
    },
    usersLiked: [{
        type: "ObjectId",
        ref: "Play"
    }],
    creator: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true })

module.exports = mongoose.model("Play", PlaySchema);
