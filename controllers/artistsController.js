const db = require("../db/queries");

async function getAllArtists(req, res) {
  const music = await db.getAllArtists();
  res.render("index", { title: "Music Inventory", music: artists });
}

async function newArtistGet(req, res) {
  res.render("form", { type: "artist" });
}

async function newArtistPost(req, res) {
  try {
    const { artistName } = req.body;
    await db.insertArtist(artistName);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting artist:", error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = {
  getAllArtists,
  newArtistGet,
  newArtistPost,
};
