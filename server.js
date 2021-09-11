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

app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});