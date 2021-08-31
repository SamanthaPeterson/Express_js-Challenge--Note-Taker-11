// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

const nodemon = require("nodemon");

const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");

// Create an express server
const app = express();

// Create a port
const PORT = process.env.PORT || 3002;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.use(express.json());
app.use("/assets", express.static("./assets"));

app.use("/api", apiR;
app.use("/", htmlR);

require("./routing/html-routes")(app);
require("./routing/api-routes")(app);

// ROUTING

module.exports = (app) => {
    // => HTML GET Requests
//app.get('/', (req, res) => {
//res.send('Welcome to the Star Wars Page!');
//});
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
//app.get('/yoda', (req, res) => {
//res.json(yoda);
//});
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
    console.log(`Note Taker listening on PORT: ${PORT} open the app here: http://localhost:${PORT}`);
});


//-----=======++++++-----=======++++++-----=======++++++-----=======++++++
//user guide for this project
//-----=======++++++-----=======++++++-----=======++++++-----=======++++++

//steps & commands 
//npm install
//npm install node
// npm install express --save
//npm install - g nodemon
//nodemon [your node app]

//npm start

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