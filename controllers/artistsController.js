const db = require("../db/queries");

async function getAllArtists(req, res) {
  const music = await db.getAllArtists();
  res.render("index", { title: "Music Inventory", music: music });
}

async function newArtistGet(req, res) {
  res.render("form", { type: "artists" });
}

async function newArtistPost(req, res) {
  try {
    const { artistName } = req.body;
    console.log(req.body);
    await db.insertArtist(artistName);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting artist:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function artistGet(req, res) {
  try {
    const music = await db.getMusicByArtist(req.params.artistId);
    const artist = await db.getArtist(req.params.artistId);
    console.log(artist);
    res.render("artistPage", { music: music, artist: artist });
  } catch (error) {
    console.error("Error inserting artist:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllArtists,
  newArtistGet,
  newArtistPost,
  artistGet,
};
