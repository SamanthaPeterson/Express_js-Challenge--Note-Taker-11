// Dependencies
const express = require("express");
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
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
