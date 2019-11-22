
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const emailExistance = require("email-existence");
/*creating a schema of database*/
var Schema = mongoose.Schema;
const userData = new Schema({
    /** creating schema for registration */
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

var chat = new Schema({
    from: {
        type: String,
        required: true
    },

    to:
    {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true
    },
},
    {
        timestamps: true

    });

var register = mongoose.model("users", userData);
var chatMsg = mongoose.model("chat", chat);

/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
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
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
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
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.ForgotPassword = (req, callback) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) {
            callback(null, data)
        }
        else {
            callback("invalid user email");
        }
    })

}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.ResetPassword = (req, callback) => {
    console.log("reqqqqq", req.decoded);
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        register.updateOne(
            { "_id": req.decoded.payload }, {
                "password": encrypted
            }
            , (err, data) => {
                if (data)
                    callback(null, data);
                else
                    callback("error");


            })
    })

}
exports.chat = (req, callback) => {
    console.log("req from -----", req);
    var details = new chatMsg({
        "from": req.from,
        "to": req.to,
        "msg": req.msg
    });
    console.log("details from -----", details);
    //creates a collection
    details.save((err, data) => {
        if (err) {
            console.log("message not saved");
            return callback(err);
        } else {
            console.log("msg saved");
            console.log("datataa from -----", data);
            return callback(null, data);

        }

    });
}


exports.getUsers = (req, callback) => {

    register.find((err, data) => {
        if (err) {
            callback(err);
        }
        else {
            console.log(data);
            callback(null, data);
        }
    })

}

exports.getMsg = (req, callback) => {

    chatMsg.find({}, (err, data) => {
        if (err) {
            callback(err);
        }
        if (data) {
            console.log(data);

            callback(null, data);
        }
    })
}