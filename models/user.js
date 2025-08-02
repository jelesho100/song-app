const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isAdded: {
        type: Boolean,
        default: false,
    },


});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    songs: [songSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;