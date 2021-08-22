// Making the appropriate connections to express, path, and file system.
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get('/api/notes/:id', (req, res) =>
  res.sendFile(path.join((__dirname, 'db/db.json'))
  )
);

app.get("/api/notes", (req, res) =>
  res.json(
    JSON.parse(fs.readFileSync("db/db.json", "utf-8"[Number(req.params.id)]))
  )
);

app.post("/api/notes", (req, res) =>
  JSON.parse(fs.readFile(path.join(__dirname, 'db/db.json'), "utf8",)
  )
);

// Listen on PORT 3001 and console log that its listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
