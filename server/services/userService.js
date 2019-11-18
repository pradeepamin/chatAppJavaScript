//importing module
var model = require('../model/userModel');
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.register = (req, callback) => {
  try{
        model.Register(req, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.login = (req, callback) => {
    try{
    model.Login(req, (err, data) => {
        if (err) {
            callback(err);
        } else
            callback(null, data);
    })
} catch (e) {
    console.log(e);
}
}
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */

exports.forgotPassword = (req, callback) => {
    try{
    model.ForgotPassword(req, (err, data) => {
        if (err) {
            callback(err);
        } else
            callback(null, data);
    })
} catch (e) {
    console.log(e);
}
}
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.resetPassword=(req,callback)=>{
    try{
    model.ResetPassword(req,(err,data)=>{
        if(err){
            callback(err);
        }else
        callback(null,data)
    })
} catch (e) {
    console.log(e);
}
}


exports.chat= (req, callback) => {
    model.chat(req, (err, data) => {
        if (err) {
            callback(err);
        } else
            callback(null, data);
    })
}




exports.getUsers=(req,callback)=>{
    model.getUsers(req,(err,data)=>{
        if(err){
            callback(err);
        }else
        callback(null,data)
    })
}

exports.getMsg=(req,callback)=>{
    model.getMsg(req,(err,data)=>{
        if(err){
            callback(err);
        }else
        callback(null,data);
    })
}
