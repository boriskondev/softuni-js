const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
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
        type: Schema.Types.Url,
        required: true,
    },
    cubes: [{
        type: Schema.Types.ObjectID,
        ref: "Cube"
    }]
}, { timestamps: true });

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;