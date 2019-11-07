
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const emailExistance = require("email-existence");
var Schema = mongoose.Schema;
const userData = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);


var register = mongoose.model("users", userData);


exports.Register = (req, callback) => {

    try {
        register.findOne({
            "email": req.body.email
        }, (err, data) => {
            if (data) callback("user exits");
            else {
                emailExistance.check(req.body.email, (err, result) => {
                    if (!result) callback("provide valid email")
                    else {
                        bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                            var userDetails = new register({
                                "firstName": req.body.firstName,
                                "lastName": req.body.lastName,
                                "email": req.body.email,
                                "password": encrypted
                            })
                            userDetails.save((err, data) => {
                                if (err) {
                                    callback(err);
                                } else callback(null, data);
                            })
                        })
                    }
                })

            } console.log("model end")
        })
    } catch (e) {
        console.log(e);
    }
}
exports.Login = (req, callback) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) {
            bcrypt.compare(req.body.password, data.password, (err, sucess) => {
                if (sucess)
                    callback(null, data);
                else
                    callback("Wrong Password");
            })
        }
        else callback("email doesnot match or exit");
    })

}

exports.ForgotPassword=(req,callback)=>{
    register.findOne({
        "email":req.body.email
    },(err,data)=>{
        if(data){
            callback(null,data)
        }
        else{
            callback("invalid user email");
        }
    })

}

exports.ResetPassword=(req,callback)=>{
    console.log("reqqqqq",req.decoded);
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        register.updateOne({
                "_id": req.decoded.payload
            }, {
                password: encrypted
            },
            (err, data) => {
                if (data)
                    callback(null, data);
                else
                    callback("error");


            })
    })

}

