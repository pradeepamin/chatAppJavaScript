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
    model.login(req, (err, data) => {
        if (err) {
            callback(err);
        } else
            callback(null, data);
    })
}
