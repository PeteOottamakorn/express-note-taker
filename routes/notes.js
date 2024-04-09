const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET route to retrieve existing notes to populate them in the sidebar
router.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route to add note to db.json file
router.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error(`Error in adding note`);
  }
});

module.exports = router;
