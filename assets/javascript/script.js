//dependencies / requirements 

const express = require("express");
const fs = require("fs");
const path = require("path");

//create the routes and use express middleware
const app = express();
const PORT = process.env.PORT || 4001













//Starts the server
app.listen(PORT, function () {
    console.log(`Note Taker Server listening on PORT: ${PORT} open the app here: http://localhost:${PORT}`);
});