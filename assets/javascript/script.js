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
app.use(express.static('public'));


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
// node app.js
//run npm init
// npm install express --save
// npm init
//npm install - g nodemon
//nodemon [your node app]
//npm i nodemon
//npm install
//npm start

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
//https://www.digitalocean.com/community/tutorials/workflow-nodemon