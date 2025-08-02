const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  try {
    res.render('songs/index.ejs', {
      songs: currentUser.songs,
      user: currentUser,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})

router.get('/new', async (req, res) => {
  res.render('songs/new.ejs');
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.songs.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/songs`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:songId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const song = currentUser.songs.id(req.params.songId);
    res.render('songs/show.ejs', {
      song: song,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:songId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const song = currentUser.songs.id(req.params.songId);
    res.render('songs/edit.ejs', {
      song: song,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:songId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    const song = currentUser.songs.id(req.params.songId);

    song.set(req.body);

    await currentUser.save();

    res.redirect(
      `/users/${currentUser._id}/songs/${req.params.songId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:songId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.songs.id(req.params.songId).deleteOne();

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/songs`);
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
})







module.exports = router;
