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
const ChatCtrl = require('./controller/userController')
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
var server = app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 3000")
});
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log("user connected")
    socket.on('newMsg', data => {
        console.log("data in sockets",data);
        
        ChatCtrl.chat(data, (err, result) => {
            if (err) {
                console.log("error on server while receiving data");
            } else {
                console.log(result)
                io.sockets.emit('Message', result)
            }
        })
    })
})
// const http = require('http').Server(server);
// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//     console.log("socket connected");
//     socket.on("newMsg", (message) => {
//         console.log("in socket on",message);
        
//         ChatCtrl.chat(message).then(res => {
//             console.log("entered", res);

//         }).catch(err => {
//             console.log("err", err);

//         })
//         console.log("in server-->", message);

//         initPromise.then(function (data) {
//             console.log("server--", data);
//         }).catch(function (err) {
//             console.log("err---", err);
//             return err;
//         });
//         io.emit(String(message.to), message);
//     })
//     io.on('disconnect', (socket) => {
//         console.log("socket disconnected");
//     })
// })


// const io = require('socket.io').listen(server);
// io.on('connection', (socket) => {
//     console.log("Connecting socket");

//     socket.on("newMsg", (data) => {
//         console.log("emit an event to the socket in service side");
//         chat.msg(data, (err, res) => {
//             if (err) {
//                 console.log("unsuccesful")
//             } else {
//                 console.log("In serever.js", res);
//                 io.sockets.emit("updatedata", res);
//                 // console.log("update the data.")
//             }
//         });
//     });

// });
// io.on('disconnect', function () {
//     console.log("socket disconnected");

// })


module.exports = app