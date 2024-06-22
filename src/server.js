const express = require("express");
const path = require("path");
const { addSong, getSongs, editSong, deleteSong } = require("./queries");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/cancion", async (req, res) => {
  const { title, artist, tune } = req.body;
  if (!title || !artist || !tune) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newSong = await addSong(title, artist, tune);
    res.status(201).json({
      message: `New song added successfully with id: ${newSong.rows[0].id}`,
      song: newSong.rows[0],
    });
  } catch (e) {
    res.status(500).json({ error: "Error adding a new song" });
  }
});

app.get("/canciones", async (req, res) => {
  try {
    const songs = await getSongs();
    res.status(200).json(songs);
  } catch (e) {
    res.status(500).json({ error: "Error getting songs" });
  }
});

app.put("/cancion/:id", async (req, res) => {
  const { title, artist, tune } = req.body;
  const { id } = req.params;
  try {
    const updatedSong = await editSong(id, title, artist, tune);
    if (updatedSong.rows.length === 0) {
      res.status(404).json({ error: `Song with id ${id} not found` });
    } else {
      res.status(200).json({
        message: `Song with id ${id} updated successfully`,
        song: updatedSong.rows[0],
      });
    }
  } catch (e) {
    res.status(500).json({ error: "Error editing song" });
  }
});

app.delete("/cancion/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSong = await deleteSong(id);
    if (deletedSong.rows.length === 0) {
      res.status(404).json({ error: `Song with id ${id} not found` });
    } else {
      res
        .status(200)
        .json({ message: `Song with id ${id} deleted successfully` });
    }
  } catch (e) {
    res.status(500).json({ error: "Error deleting song" });
  }
});

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
