const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

router.get("/", (req, res) => {
  readFromFile(".db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error(`Error in adding note`);
  }
});

module.exports = router;
