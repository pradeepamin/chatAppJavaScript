//importing requires function
try{
const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const tokenRec=require('../middleware/tocken')

//creating API for register,login,
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/resetPassword/:token',tokenRec.verify,userController.resetPassword)
router.post('/storeMsg',userController.chat)
 router.get('/getUsers',userController.getUsers)
 router.get('/getMsg',userController.getMsg)
module.exports=router;
}catch (e) {
    console.log(e);
}
 