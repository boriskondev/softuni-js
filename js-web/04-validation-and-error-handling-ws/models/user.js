const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isAlphanumeric, isEmpty } = require("validator");

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username."],
        unique: [true, "This username already exists."],
        minlength: [5, "Minimum length is 5 characters."],
        validate: [isAlphanumeric, "Username should contain letters and digits only."],
    },
    password: {
        type: String,
        required: [true, "Please enter a password."],
        minlength: [8, "Minimum length is 8 characters."],
        validate: [(val) => { isEmpty }, "Password should not be empty."]
    },
}, {timestamps: true });

// userSchema.pre("save", function (next) {
//     console.log("Following user is about to be created:");
//     console.log(this);
//     next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;