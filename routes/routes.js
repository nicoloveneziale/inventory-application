const { Router } = require("express");
const {
  getAllMusic,
  newMusicGet,
  newMusicPost,
} = require("../controllers/musicController");

const {
  getAllArtists,
  newArtistGet,
  newArtistPost,
} = require("../controllers/artistsController");

const router = Router();

router.get("/albums/new", newMusicGet);

router.post("/albums/new", newMusicPost);

router.get("/artists/new", newArtistGet);

router.post("/artists/new", newArtistPost);

router.get("/", getAllMusic);

module.exports = router;
