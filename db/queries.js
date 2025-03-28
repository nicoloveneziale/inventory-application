const pool = require("./pool");

async function getAllMusic() {
  const { rows } = await pool.query(`
    SELECT
      music.albumName,
      music.releaseDate,
      music.type,
      artists.name AS artistName
    FROM
      music
    JOIN
      artists ON music.artistId = artists.artistId;
  `);
  return rows;
}

async function insertMusic(albumName, artistId, releaseDate, type) {
  await pool.query(
    "INSERT INTO music (albumName, artistId, releaseDate, type) VALUES ($1,$2,$3,$4)",
    [albumName, artistId, releaseDate, type],
  );
}

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}

async function getArtistByName(artistName) {
  const { rows } = await pool.query(
    "SELECT * FROM artists WHERE artistName == ($1)",
    [artistName],
  );
  return rows;
}

async function insertArtist(artistName) {
  await pool.query("INSERT INTO artist (artistName) VALUES ($1)", [artistName]);
}

module.exports = {
  getAllMusic,
  insertMusic,
  getAllArtists,
  getArtistByName,
  insertArtist,
};
