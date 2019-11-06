
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
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

 
var register = mongoose.model("user", userData);


exports.Register = (req, callback) => {
    try {
        register.findOne({
            "email": req.body.email
        }, (err, data) => {
            if (data) callback("user exits");
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
    } catch (e) {
        console.log(e);
    }
}

