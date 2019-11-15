/********************************************************************************************************************
 * @Execution : default nodemon : cmd> server.js
 * @Purpose : learn backend using node
 * @description : Using express frame work and socketio build a realtime cpplication
 * @overview : chat application 
 * @author : PRADEEP B AMIN<pradeepbamin5@gmail.com>
 * @version : 1.0
 * @since : 02-NOV-2019
 *
 *******************************************************************************************************************/
//importing express framework 
const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config()
const app = express();
const routers = require('./router/router.js')
app.use(bodyParser.json());          //to support json encode bodies
app.use(bodyParser.urlencoded({ extended: true }))  //app.use() to specify middleware as the callback function
app.use(expressValidator());
// to connect Database
//importing mongoose (mongodb)
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

app.use(express.static('../client'))
//Initalizing the app port number,Telling frame work to start service
app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 3000")
});
module.exports=app