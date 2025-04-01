const pool = require("./pool");

async function getAllMusic() {
  const { rows } = await pool.query(`
    SELECT
      albumName, type, releaseDate, name
    FROM
      music
      INNER JOIN artists
      ON music.artistId = artists.artistId
    ;
  `);
  return rows;
}

async function getMusicById(musicId) {
  const { rows } = await pool.query(
    `
    SELECT
      albumName, type, releaseDate, name, musicId, albumCover
      FROM
      music
      INNER JOIN artists
      ON music.artistId = artists.artistId
      WHERE musicId = ($1)
    ;
  `,
    [musicId],
  );
  return rows;
}

async function getMusicByArtist(artistId) {
  const { rows } = await pool.query(
    `
    SELECT
      musicId, albumName, type, releaseDate, name
      FROM
      music
      INNER JOIN artists
      ON music.artistId = artists.artistId
      WHERE music.artistId = ($1)
    ;
  `,
    [artistId],
  );
  return rows;
}

async function getAllVinyls() {
  const { rows } = await pool.query(`
    SELECT
      musicId, albumName, type, releaseDate, name, albumCover
    FROM
      music
      INNER JOIN artists
      ON music.artistId = artists.artistId
      WHERE type='Vinyl'
    ;
  `);
  return rows;
}

async function getAllCDs() {
  const { rows } = await pool.query(`
    SELECT
      musicId, albumName, type, releaseDate, name, albumCover
    FROM
      music
      INNER JOIN artists
      ON music.artistId = artists.artistId
      WHERE type='CD'
    ;
  `);
  return rows;
}

async function insertMusic(albumName, artistid, releaseDate, type, imagePath) {
  await pool.query(
    `
    INSERT INTO music (albumName, artistId, releaseDate, type, albumCover)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [albumName, artistid, releaseDate, type, imagePath],
  );
}

async function updateMusic(musicId, albumName, artistId, releaseDate, type) {
  await pool.query(
    `UPDATE music 
    SET albumName = ($2), artistId = ($3), releaseDate = ($4), type = ($5)
    WHERE musicId = ($1)`,
    [musicId, albumName, artistId, releaseDate, type],
  );
}

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}

async function getArtist(artistId) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM artists WHERE artistId = ($1)`,
      [artistId],
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

async function getArtistByName(artistName) {
  try {
    const { rows } = await pool.query(
      `SELECT artistId FROM artists WHERE name = ($1)`,
      [artistName],
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

async function insertArtist(artistName) {
  await pool.query("INSERT INTO artists (name) VALUES ($1)", [artistName]);
}

async function deleteMusic(musicId) {
  await pool.query("DELETE FROM music WHERE musicId = ($1)", [musicId]);
}

module.exports = {
  getAllMusic,
  getAllCDs,
  getAllVinyls,
  insertMusic,
  getAllArtists,
  getArtistByName,
  insertArtist,
  getMusicByArtist,
  getArtist,
  getMusicById,
  updateMusic,
  deleteMusic,
};
