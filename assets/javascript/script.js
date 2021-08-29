//dependencies / requirements 

const express = require("express");
const fs = require("fs");
const path = require("path");

//create the routes and use express middleware
const app = express();
const PORT = process.env.PORT || 4001


// Set up the Express app for data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));











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


//-----=======++++++-----=======++++++-----=======++++++-----=======++++++

//resources
//https: //expressjs.com/
// to install express https://expressjs.com/en/starter/installing.html
//-----=======++++++-----=======++++++-----=======++++++-----=======++++++

//info
//express is a framework for node js