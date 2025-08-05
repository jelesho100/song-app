const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    res.render("playlists/index.ejs", { playlists: user.playlists, user });
});

router.get("/new", (req, res) => {
    res.render("playlists/new.ejs", { user: req.session.user });
});

router.post("/", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    user.playlists.push({ name: req.body.name, songs: [] });
    await user.save();
    res.redirect("/playlists");
});

router.get("/:playlistId", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const playlist = user.playlists.id(req.params.playlistId);
    res.render("playlists/show.ejs", { playlist, user });
});

// POST /playlists/:playlistId/songs - add a song to a specific playlist
router.post("/:playlistId/songs", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const playlist = user.playlists.id(req.params.playlistId);

    playlist.songs.push({
        name: req.body.name,
        artist: req.body.artist
    });

    await user.save();
    res.redirect(`/playlists/${playlist._id}`);
});

router.delete("/:playlistId/songs/:songIndex", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const playlist = user.playlists.id(req.params.playlistId);

    playlist.songs.splice(req.params.songIndex, 1);
    await user.save();

    res.redirect(`/playlists/${playlist._id}`);
});

module.exports = router;

