//asking app to listen on port 3306 -in the terminal it should say now listening on port... if it worked correctly 
//https://www.npmjs.com/package/dotenv dotenv is a great way to keep important items like passwords or api keys safe for
const PORT = process.env.PORT || 3306;
// https: //expressjs.com/en/starter/hello-world.html
//make sure you have express installed npm install express --save
const express = require('express');
const app = express();
const nodemon = require('nodemon');
//https: //www.npmjs.com/package/nodemon
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

//app.listen() Function https://www.geeksforgeeks.org/express-js-app-listen-function/
//function is used to bind and listen the connections on the specified host and port
//https: //www.google.com/search?q=app.listen(PORT,+()+%3D%3E+%7B&rlz=1C5CHFA_enUS956US956&ei=UTg9Ydy9Bo_L0PEPnIqtgA8&oq=app.listen(PORT,+()+%3D%3E+%7B&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEIAEELADMggIABCABBCwAzIICAAQgAQQsAMyCAgAEIAEELADMggIABCABBCwAzIICAAQgAQQsAMyCAgAEIAEELADMggIABCABBCwAzIHCAAQsAMQHjIICAAQgAQQsAMyCAgAEOQCELADMggIABDkAhCwAzIICAAQ5AIQsANKBQg8EgExSgQIQRgBULrxfli68X5g9fd-aAFwAHgAgAEAiAEAkgEAmAEAoAECoAEByAENwAEB&sclient=gws-wiz&ved=0ahUKEwicqs6khvjyAhWPJTQIHRxFC_AQ4dUDCA4&uact=5&pccc=1
app.listen(PORT, () => {
    //debugging
    console.log(`API server now on port ${PORT}!`);
});


//node server.js
//npm install -g nodemon then nodemon server.js
//i prefer running my programs with Nodemon file.js so that i don't have to exit and restart the server