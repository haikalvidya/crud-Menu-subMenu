const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const indexRouter = require('./routes/index');

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// declare database
const db = require("./models/index.js")
// delete all database rows for development purpose
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// route to index router
app.use('/', indexRouter);

// simple route on homepage
app.get("/", (req, res) =>{
    res.json({message: "Welcome to web app, read README.txt for more information about the service REST"})
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});