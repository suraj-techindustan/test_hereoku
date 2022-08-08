const express=require('express')
const router=express.Router()
const {imageUpload}=require("../middlewares/imageupload")
const userController = require("../controllers/user-controller")
const auth=require('../middlewares/auth')

router.post('/signup', userController.createUser)
router.post('/login',userController.login)

router.post('/forgotPassword',userController.forgotPassword)
router.post('/verifyOtp',auth,userController.verifyOtp)
router.post('/resetPassword',auth,userController.resetPassword)

router.post('/upload/:_id',imageUpload.single('image'),userController.imageUpload)


module.exports=router;