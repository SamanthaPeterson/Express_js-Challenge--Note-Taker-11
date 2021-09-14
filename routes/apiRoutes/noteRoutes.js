//https://expressjs.com/en/guide/routing.html routing = how app end points respond to client request
const router = require("express").Router();

//https://itnext.io/how-to-share-a-single-database-connection-in-a-node-js-express-js-app-fcad4cbcb1e
//"The idea is that when we first initialize our app, before we start listening for http connections, we will initialize our database connection by calling initDb and thereafter, we will be able to get an instance of our connected database by just calling getDb.database object is stored in a _db object"
//history of notes stored as a json object in db folder
const {
    notes
} = require('../../db/db');

//to create or delete a note
//The Delete operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
const {
    noteCreateNewNote,
    noteDeleteNote
} = require('../../lib/noteFunctions');

//save note history to json db 
//https://www.google.com/search?q=req+and+res+express&rlz=1C5CHFA_enUS956US956&oq=req+and+res&aqs=chrome.1.0i512j0i20i263i512j0i512l2j0i22i30l6.7523j0j4&sourceid=chrome&ie=UTF-8
//req object represents the HTTP request, has properties for the request query string, params etc.
//res object represents the HTTP response that an Express app sends when it gets an HTTP request
router.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

router.post('/notes', (req, res) => {
    //req.body holds params that are sent from the client as part of a POST request
    //https://www.google.com/search?q=req.body.id&rlz=1C5CHFA_enUS956US956&sxsrf=AOaemvKGY312QoUwkH4PqOMtWmVDSP7SNA%3A1631569829576&ei=pcc_YYy3IonA0PEPkJyr0AI&oq=req.body.id&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIECAAQHjIGCAAQBRAeMgYIABAFEB4yBAgAEB46BwgAEEcQsANKBAhBGABQ-5IIWPuSCGDpoAhoAXACeACAAXmIAXmSAQMwLjGYAQCgAQKgAQHIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwjMnfig9_zyAhUJIDQIHRDOCioQ4dUDCA4&uact=5
    req.body.id = notes.length.toString();
    let note = noteCreateNewNote(req.body, notes);
    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    noteDeleteNote(notes, req.params.id);
    res.json(notes);
 })

//https://stackoverflow.com/questions/56078508/why-is-module-exports-router-is-needed
//the module.exports=router is mapping a router and the logic required to map file along with the right callbacks etc.
module.exports = router;