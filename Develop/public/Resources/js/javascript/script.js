//nodemon script.js

//dependencies / requirements 

const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemon = require("nodemon");

//create the routes and use express middleware
const app = express();
const PORT = process.env.PORT || 3002

// Set up the Express app for data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use("/assets", express.static("./assets"));

//Set up the root directory  and routes 
app.use(express.static("public"));
app.use('/api', api.js);
app.use('/html', html.js);


// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use("/assets", express.static("./assets"));


require("./routing/html-routes")(app);
require("./routing/api-routes")(app);


let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
    elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
    elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
    fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const saveNote = (note) =>
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const renderActiveNote = () => {
    hide(saveNoteBtn);

    if (activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
    } else {
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTitle.value = '';
        noteText.value = '';
    }
};

const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value,
    };
    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItems = [];

    // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.classList.add('list-item-title');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNoteView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );
            delBtnEl.addEventListener('click', handleNoteDelete);

            liEl.append(delBtnEl);
        }

        return liEl;
    };

    if (jsonNotes.length === 0) {
        noteListItems.push(createLi('No saved Notes', false));
    }

    jsonNotes.forEach((note) => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);

        noteListItems.push(li);
    });

    if (window.location.pathname === '/notes') {
        noteListItems.forEach((note) => noteList[0].append(note));
    }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();










// ROUTING

module.exports = (app) => {
    // => HTML GET Requests

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // If no matching route is found default to home
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};










//Starts the server
app.listen(PORT, function () {
    console.log(`Note Taker Server listening on PORT: ${PORT} open the app here: http://localhost:${PORT}`);
});



//-----=======++++++-----=======++++++-----=======++++++-----=======++++++
//user guide for this project
//-----=======++++++-----=======++++++-----=======++++++-----=======++++++

//steps & commands 
//npm install
//npm start
// npm install express --save
//npm install - g nodemon
//nodemon [your node app]


// node app.js
//run npm init

// npm init


//npm i nodemon



//nodemon. / server.js localhost 8080



//-----=======++++++-----=======++++++-----=======++++++-----=======++++++

//resources
//https: //expressjs.com/
// to install express https://expressjs.com/en/starter/installing.html
//node needs to be installed https://nodejs.org/en/
//https: //www.npmjs.com/package/nodemon
//https: //www.npmjs.com/package/express

//-----=======++++++-----=======++++++-----=======++++++-----=======++++++

//info
//express is a framework for node js


// {
//   "name": "nodemon",
//   "homepage": "http://nodemon.io",
//   "...": "... other standard package.json values",
//   "nodemonConfig": {
//     "ignore": ["test/*", "docs/*"],
//     "delay": 2500
//   }
// }


//nodemon server.js
//nodemon server.js 3006
//https://www.digitalocean.com/community/tutorials/workflow-nodemonno