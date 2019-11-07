var model = require('../model/userModel');

exports.register = (req, callback) => {
  
        model.Register(req, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })

}

exports.login = (req, callback) => {
    model.Login(req, (err, data) => {
        if (err) {
            callback(err);
        } else
            callback(null, data);
    })
}

exports.forgotPassword = (req, callback) => {
    model.ForgotPassword(req, (err, data) => {
        if (err) {
            callback(err);
        } else
            callback(null, data);
    })
}

exports.resetPassword=(req,callback)=>{
    model.ResetPassword(req,(err,data)=>{
        if(err){
            callback(err);
        }else
        callback(null,data)
    })
}
