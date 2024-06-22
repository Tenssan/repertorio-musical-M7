require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD_DB,
  port: process.env.DB_PORT,
});

const addSong = async (title, artist, tune) => {
  const query = {
    text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *",
    values: [
      title.toLowerCase().trim(),
      artist.toLowerCase().trim(),
      tune.toLowerCase().trim(),
    ],
  };
  try {
    const res = await pool.query(query);
    return res;
  } catch (e) {
    console.error("Error adding a new song: ", e);
    throw e;
  }
};

const getSongs = async () => {
  const query = {
    text: "SELECT * FROM canciones",
  };
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (e) {
    console.error("Error getting songs: ", e);
    throw e;
  }
};

const editSong = async (id, title, artist, tune) => {
  let setClauses = [];
  let values = [];
  let counter = 1;

  if (title !== undefined) {
    setClauses.push(`titulo = $${counter}`);
    values.push(title.toLowerCase().trim());
    counter++;
  }
  if (artist !== undefined) {
    setClauses.push(`artista = $${counter}`);
    values.push(artist.toLowerCase().trim());
    counter++;
  }
  if (tune !== undefined) {
    setClauses.push(`tono = $${counter}`);
    values.push(tune.toLowerCase().trim());
    counter++;
  }

  if (setClauses.length === 0) {
    console.error("No fields to update");
    return;
  }

  values.push(id);

  const query = {
    text: `UPDATE canciones SET ${setClauses.join(
      ", "
    )} WHERE id = $${counter} RETURNING *`,
    values: values,
  };

  try {
    const res = await pool.query(query);
    return res;
  } catch (e) {
    console.error("Error editing a song: ", e);
    throw e;
  }
};

const deleteSong = async (id) => {
  const query = {
    text: "DELETE FROM canciones WHERE id = $1 RETURNING *",
    values: [id],
  };
  try {
    const res = await pool.query(query);
    return res;
  } catch (e) {
    console.error("Error deleting a song: ", e);
    throw e;
  }
};

module.exports = { addSong, getSongs, editSong, deleteSong };
