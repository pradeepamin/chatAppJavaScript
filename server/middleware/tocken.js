const jwt=require('jsonwebtoken');
// console.log("in token");
exports.GenerateToken=(payload)=>{
   {
       //console.log("in token id",payload);
       const token =  jwt.sign({payload}, process.env.KEY, { expiresIn:'1h' }) // expires in 1 hour
       const obj = {        
           success: true,
           message: 'Token Generated Successfully!!',
           token: token
       }
       return obj;
   }
}
// exports.verify=(req, res, next)=>{
//     console.log("Verifies request",req);
//     // console.log("token in varify",req.header);    
//     var token = req.params.token;
//     // var token = req.header.token;
//         jwt.verify(token, process.env.KEY, (err, result) => {
//             if (err) res.status(422).send({message:"token is not correct"});
//             else {
//                 req.decoded = result;
//                 next();
//             }
//         })

// }
exports.verify=(req, res, next)=>{
    console.log("Verifies request");
    var token = req.params.token;
        jwt.verify(token, process.env.KEY, (err, result) => {
            if (err) res.status(422).send({message:"token is not correct"});
            else {
                req.decoded = result;
                next();
            }
        })

}


 