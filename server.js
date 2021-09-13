const PORT = process.env.PORT || 3306;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


//urlencoded() function = a built-in middleware function in Express
//https://www.google.com/search?q=app.use(express.urlencoded(%7B&rlz=1C5CHFA_enUS956US956&oq=app.use(express.urlencoded(%7B&aqs=chrome..69i57j0i512l3j0i30l3.1374j0j15&sourceid=chrome&ie=UTF-8
app.use(express.urlencoded({
    extended: true
}));

//adds a middleware - To serve static files such as images, CSS files, and JavaScript file
// https: //www.google.com/search?q=app.use(express.static&rlz=1C5CHFA_enUS956US956&oq=app.use(express.static&aqs=chrome..69i57j0i512l9.1090j0j15&sourceid=chrome&ie=UTF-8
app.use(express.static('public'));
app.use(express.json());
//
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

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



//function is used to bind and listen the connections on the specified host and port
//https: //www.google.com/search?q=app.listen(PORT,+()+%3D%3E+%7B&rlz=1C5CHFA_enUS956US956&ei=UTg9Ydy9Bo_L0PEPnIqtgA8&oq=app.listen(PORT,+()+%3D%3E+%7B&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEIAEELADMggIABCABBCwAzIICAAQgAQQsAMyCAgAEIAEELADMggIABCABBCwAzIICAAQgAQQsAMyCAgAEIAEELADMggIABCABBCwAzIHCAAQsAMQHjIICAAQgAQQsAMyCAgAEOQCELADMggIABDkAhCwAzIICAAQ5AIQsANKBQg8EgExSgQIQRgBULrxfli68X5g9fd-aAFwAHgAgAEAiAEAkgEAmAEAoAECoAEByAENwAEB&sclient=gws-wiz&ved=0ahUKEwicqs6khvjyAhWPJTQIHRxFC_AQ4dUDCA4&uact=5&pccc=1
app.listen(PORT, () => {
    //debugging
    console.log(`API server now on port ${PORT}!`);
});