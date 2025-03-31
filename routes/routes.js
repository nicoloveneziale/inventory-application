const { Router } = require("express");
const {
  getAllMusic,
  newMusicGet,
  newMusicPost,
  musicUpdateGet,
  musicUpdatePost,
} = require("../controllers/musicController");

const {
  newArtistGet,
  newArtistPost,
  artistGet,
} = require("../controllers/artistsController");

const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/albums/new", newMusicGet);

router.post("/albums/new", upload.single("albumCover"), newMusicPost);
router.get("/artists/new", newArtistGet);

router.post("/artists/new", newArtistPost);

router.get("/artists/:artistId", artistGet);

router.get("/albums/:musicId/update", musicUpdateGet);

router.post("/albums/:musicId/update", musicUpdatePost);

router.get("/", getAllMusic);

module.exports = router;
