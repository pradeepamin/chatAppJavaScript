const userService = require("../services/userService")
const tokenGenerate = require('../middleware/tocken');
const nodeMail = require('../middleware/nodeMailer')
/**
 * @desc Gets the input from front end filters and performs validation  
 * @param req request contains all the requested data
 * @param response sends the data or err  
 * @return responses with a http response
 */
exports.register = (req, res) => {
    try {
        req.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        req.checkBody('lastName', 'lastname is invalid').notEmpty().isAlpha();
        req.checkBody('email', 'email is invalid').notEmpty().isEmail();
        req.checkBody('password', 'password is invalid').notEmpty().len(8, 13);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.sucess = false;
            res.status(422).send(response);
            console.log("errpo-register", error);
            console.log("REs", response)
        } else {
            userService.register(req, (err, data) => {
                if (err) {
                    response.sucessss = false;
                    response.data = err;
                    res.status(404).send(response);
                } else {
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }
            })

        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.login = (req, res) => {
    try {
        console.log("Loging on");
        req.checkBody('email', 'email is invaild').notEmpty().isEmail();
        req.checkBody('password', 'Password is inavlid').notEmpty().len(8, 13);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            res.status("422").send(response);
            console.log("Error in login", error)
        }
        else {
            userService.login(req, (err, data) => {
                if (err) {
                    response.failure = false;
                    response.data = err;
                    res.status(404).send(response);
                }
                else {
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.forgotPassword = (req, res) => {
    try {
        console.log("If forgot password");
        req.checkBody('email', 'email is invalid').notEmpty().isEmail();
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            res.status(422).send(response)
        }
        else {
            userService.forgotPassword(req, (err, data) => {
                if (err) {
                    response.failure = false;
                    response.data = err;
                    res.status(404).send(response);
                } else {
                    let payLoad = data._id;
                    let obj = tokenGenerate.GenerateToken(payLoad);
                    console.log("controller pay load", obj);
                    let url = `http://localhost:3000/#!/resetPassword/${obj.token}`
                    console.log("controller pay load", url);
                    nodeMail.sendMailer(url, req.body.email)
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.resetPassword = (req, res) => {
    try {
        console.log("Re-setting password");
        req.checkBody('password', 'password is invalid').notEmpty().len(8, 13);
        req.checkBody('confirmPassword', 'password is invalid').notEmpty().len(8, 13);
        var error = req.validationErrors();
        if (req.body.password != req.body.confirmPassword)
            var error = "confirmpassword is incorrect";
        var response = {};
        if (error) {
            response.error = error;
            response.failure = false;
            return res.status(422).send(response);
        } else {
            userService.resetPassword(req, (err, data) => {
                if (err) {
                    res.status(404).send(response);
                } else {
                    res.status(200).send(data);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}


exports.chat = (req) => {
    userService.chat(req, (err, data) => {
        let response={}
        if (err) {
            response.success = false;
            response.error = err;
            return err;
        } else {
            console.log("data in chat contr4oller",data);
            
            response.success = true;
            response.result = data;           
            return data;
        }
    })
}

exports.getUsers=(req,res)=>{
    var response = {};
    userService.getUsers(req,(err,data)=>{
        if(err)
        {   response.success = false;
            response.error = err;
            return res.status(400).send(response);
        }else{
            response.success = true;
            response.result = data;           
            return res.status(200).send(response);
        }
    })
}

exports.getMsg=(req,res)=>{
    var response={};
        userService.getMsg(req,(err,data)=>{
            if(err){
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            }else{
                response.success = true;
                response.result = data;           
                return res.status(200).send(response);
            }
        })
}
