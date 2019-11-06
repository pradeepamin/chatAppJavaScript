const express=require('express')
const bodyparser=require('body-parser');
const expressValidator=require('express-validator');
const app=express();

const routers=require('./router/router.js')

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(expressValidator());

const dbconfig=require('./configuration/dbConfig.js')
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect(dbconfig.url,{
useNewUrlParser:true
})
.then(()=>{
    console.log("Successfully connected to the database");
})
.catch(()=>{
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

app.use('/',routers);


app.listen(3000,()=>{
    console.log("Server is listing on port 3000")
});