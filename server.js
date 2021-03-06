// Making the appropriate connections to express, path, and file system.
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

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

app.get('/api/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.post('/api/notes', (req, res) => {
   const addNote = req.body;
   const noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
   const uniqueId = (noteList.length).toString();

   addNote.id = uniqueId;

   noteList.push(addNote);

   fs.writeFileSync('db/db.json', JSON.stringify(noteList));
   res.json(noteList);
})

app.delete('/api/notes/:id', (req, res) => {
  let noteList = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
  let noteID = req.params.id;
  let newID = 0;

  noteList = noteList.filter(thisNote => {
    return thisNote.id != noteID;
  })

  for(thisNote of noteList) {
    thisNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync('db/db.json', JSON.stringify(noteList));
  res.json(noteList);
})

// Listen on PORT 3001 and console log that its listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
