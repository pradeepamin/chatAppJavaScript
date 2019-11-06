const userService=require("../services/userService")
exports.register = (req, res) => {
        console.log("registation done");
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
            console.log("errpo",error);
        } else {
            userService.register(req, (err, data) => {
                if (err) {
                    response.sucess=false;
                    response.data=err;
                    res.status(404).send(response);
                } else {
                    response.sucess=true;
                    response.data=data;
                    res.status(200).send(response);
                }
            })
        }
}
exports.login=(req,res)=>{
    console.log("Login done");
    req.checkBody('email', 'email is invalid').notEmpty().isEmail();
    req.checkBody('password', 'password is invalid').notEmpty().len(8, 13);
    var error=req.validationErrors();
    var response={};
    if(error){
        response.error = error;
            response.sucess = false;
            res.status(422).send(response);
            console.log("errpo",error);
    }
    else{
        userService.login(req,(err,data)=>{
            if (err) {
                response.sucess=false;
                response.data=err;
                res.status(404).send(response);
            } else {
                response.sucess=true;
                response.data=data;
                res.status(200).send(response);
            }
    })
}
}

