const db = require("../db/queries");

async function getAllMusic(req, res) {
  const vinyls = await db.getAllVinyls();
  const cds = await db.getAllCDs();
  const artists = await db.getAllArtists();
  res.render("index", {
    title: "Music Inventory",
    vinyls: vinyls,
    cds: cds,
    artists: artists,
    type: "albums",
  });
}

async function newMusicGet(req, res) {
  const artists = await db.getAllArtists();
  res.render("form", { type: "albums", artists: artists });
}

async function newMusicPost(req, res) {
  try {
    const { albumName, artistName, releaseDate, type } = req.body;
    const imagePath = req.file ? req.file.path : null;

    console.log(req);
    const artistData = await db.getArtistByName(artistName);
    const artistid = artistData ? artistData.artistid : null;

    console.log(artistid);
    if (artistid) {
      await db.insertMusic(albumName, artistid, releaseDate, type, imagePath);
      res.redirect("/");
    } else {
      res.status(400).send("Artist not found");
    }
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).send("Error creating album.");
  }
}

async function musicUpdateGet(req, res) {
  const album = await db.getMusicById(req.params.musicId);
  console.log(album);
  const artists = await db.getAllArtists();
  console.log(album);
  res.render("updateForm", {
    type: "albums",
    album: album[0],
    artists: artists,
  });
}

async function musicUpdatePost(req, res) {
  const { albumName, artistName, releaseDate, type } = req.body;
  const { musicId } = req.params;
  const { artistid } = await db.getArtistByName(artistName);
  await db.updateMusic(musicId, albumName, artistid, releaseDate, type);
  res.redirect("/");
}

module.exports = {
  getAllMusic,
  newMusicGet,
  newMusicPost,
  musicUpdateGet,
  musicUpdatePost,
};
