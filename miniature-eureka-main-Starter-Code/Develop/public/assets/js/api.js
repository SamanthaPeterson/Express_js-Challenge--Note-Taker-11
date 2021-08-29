let db_Data = require('../../../db/db.json');
const fs = require('fs');
const path = require('path');
const filePath = __dirname + '/../db/db.json';

// ROUTING

module.exports = (app) => {
    // API GET Requests

    app.get('/api/notes', (req, res) => res.json(db_Data));

    // API POST Requests

    app.post('/api/notes', (req, res) => {
        console.log(req)
        const randomId = Math.floor(Math.random() * 1000).toString();
        console.log("this is random Word :" + randomId);
        console.log(filePath);
        const NoteData =

            {
                id: randomId,
                title: req.body.title,
                text: req.body.text
            }
        db_Data.push(NoteData)
        fs.writeFile(filePath, JSON.stringify(db_Data), (err) => {
            if (err) console.log(err);
            console.log('The file has been saved!');
            res.json(db_Data)
        })
    })

    app.delete('/api/notes/:id', (req, res) => {
        console.log('NEW DATA', db_Data);
        Note_Data = db_Data.filter(note => note.id !== req.params.id)
        console.log(Note_Data);
        db_Data = Note_Data;
        fs.writeFile(filePath, JSON.stringify(Note_Data), (err) => {
            if (err) console.log(err)
            console.log('The file has been saved!');
            res.json(Note_Data)
        })
    })
};
