const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS artists (
    artistId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR( 255 ) UNIQUE,
    artistCover VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS music (
    musicId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    albumName TEXT,
    artistId INTEGER,
    releaseDate INTEGER,
    type VARCHAR( 255 ),
    albumCover VARCHAR(255),
    FOREIGN KEY (artistId) REFERENCES artists(artistId)
    );
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}

main();
