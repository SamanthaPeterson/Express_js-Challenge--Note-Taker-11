const fs = require("fs");
//https://nodejs.dev/learn/the-nodejs-fs-module - "useful functionality, access & interact with the file system."
const express = require("express");
const path = require("path");
//https://nodejs.dev/learn/the-nodejs-path-module - "provides path segment separator = \ & path.delimiter = ;"

// Sets up the Express App
const app = express();

// Sets port for listening 
const PORT = process.env.PORT || 3306;

//serve images, CSS files, and JavaScript files in a directory named public
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


//route to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//route to read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//route to index.html aka main page

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//receive a new note to save on the request body, add it to the `db.json` file, 
//and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    //create new property called id based on length and assign it to each json object
    newNote.id = notelength;
    //push updated note to the data containing notes history in db.json
    noteList.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

//delete note according to their tagged id.
app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    //filter all notes that does not have matching id and saved them as a new array
    //the matching array will be deleted
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});


//listen tot he port when deployed
app.listen(PORT, () => console.log("Server listening on port " + PORT));

//--

function noteCreateNewNote(body, noteTakerArray) {
    const note = body;
    noteTakerArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
    return note;
}

function noteDeleteNote(noteTakerArray, id) {
    let deleteID = parseInt(id);
    noteTakerArray.splice(deleteID, 1);

    // This loop re-writes the indexes for the remaining notes.
    for (let i = deleteID; i < noteTakerArray.length; i++) {
        noteTakerArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
}


module.exports = {
    noteCreateNewNote,
    noteDeleteNote
};