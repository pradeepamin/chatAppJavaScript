const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const tokenRec=require('../middleware/tocken')



router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/resetPassword/:token',tokenRec.verify,userController.resetPassword)


module.exports=router;