const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clog);
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

//GET route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

//GET route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});

//Wildcard route back to homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

//Begin listening for server pings and lets the user know it's listening in the console
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
