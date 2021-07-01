const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imageUrl: {
        type: mongoose.SchemaTypes.Url,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: Schema.Types.ObjectID,
        ref: "Accessory"
    }],
    creatorID: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }
}, { timestamps: true });

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;