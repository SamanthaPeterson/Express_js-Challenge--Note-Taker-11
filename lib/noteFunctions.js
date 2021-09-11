const fs = require("fs");
//https://nodejs.dev/learn/the-nodejs-fs-module - "useful functionality, access & interact with the file system."

const path = require("path");
//https://nodejs.dev/learn/the-nodejs-path-module - "provides path segment separator = \ & path.delimiter = ;"

function noteCreateNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
    return note;
}

function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);
    notesArray.splice(deleteID, 1);

    // This loop re-writes the indexes for the remaining notes.
    for (let i = deleteID; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
}


module.exports = {
    noteCreateNewNote,
    deleteNote
};