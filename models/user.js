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

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [songSchema]
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
    songs: [songSchema],
    playlists: [playlistSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;