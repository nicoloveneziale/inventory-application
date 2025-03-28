const db = require("../db/queries");

async function getAllMusic(req, res) {
  const music = await db.getAllMusic();
  res.render("index", { title: "Music Inventory", music: music });
}

async function newMusicGet(req, res) {
  const artists = await db.getAllArtists();
  res.render("form", { type: "albums", artists: artists });
}

async function newMusicPost(req, res) {
  const { albumName, artistName, releaseDate, type } = req.body;
  const { artistId } = db.getArtistByName(artistName);
  await db.insertMusic(albumName, artistId, releaseDate, type);
  res.redirect("/");
}

module.exports = {
  getAllMusic,
  newMusicGet,
  newMusicPost,
};
