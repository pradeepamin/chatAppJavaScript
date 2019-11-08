const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config()
const app = express();
const routers = require('./router/router.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))  //app.use() to specify middleware as the callback function
app.use(expressValidator());


// to connect Database
const dbconfig = require('./configuration/dbConfig.js')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true 
})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(() => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    })

app.use('/', routers);


app.listen(3000, () => {
    console.log("Server is listing on port 3000")
});
module.exports=app