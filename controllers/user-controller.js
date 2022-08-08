const { User} = require('../models/user')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const asyncMiddleware = require('../middlewares/async')
const config =require('config')
const multer=require('multer')
const fs = require("fs");

exports.createUser = asyncMiddleware(async (req, res) => {
    let user=await User.findOne({email:req.body.email})
    if(user){return res.status(400).send({message:"User already exists"})}

     user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res.send({message:"User added successfully", data : user})
})

exports.login = asyncMiddleware(async (req, res) => {
    
    
    let user = await User.findOne({ email: req.body.email})
    if (!user) res.status(400).send({ message: 'Please enter valid email id or password.' });
    
    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(400).send({ message: 'Please enter valid email id or password.' })
    
    const userId = user._id
    console.log('userID : ',userId)

    const token=jwt.sign({email:user.email },config.get('sdkskdsk'))
    res.status(200).send({message :'Login done',accesToken : token , data:user});
})

exports.forgotPassword = asyncMiddleware(async (req,res)=>{
    
    try {
        const { email } = req.body
        if (!email) return res.status(400).send({ message: "Email doesn't exist." })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).send({ message: " User with this Email doesn't exist.." })
        const userId = user._id
        let getOtp = await User.findOne({ email })
        const Otp = 1234
        if (getOtp) {
            getOtp.otp = Otp
            await getOtp.save()
        } else {
            getOtp = new Otp({
                email,
                otp: Otp,
                resetToken: "123456",
                expiresIn: 0,
                createdAt: Date.now(),
            })
        
            await getOtp.save()

        }
        const token=jwt.sign({_id:userId},config.get("sdkskdsk"))
        res.header('Authorization',token);

        return res.send({ message: 'Otp sent to your email address',data:Otp ,acessToken:token})
        } catch (ex) {
         res.status(400).send({ message: ex.message || 'Something went wrong' })
        }
        
        await user.save();
        return res.send({message:" Done"})
})

exports.verifyOtp = asyncMiddleware(async (req, res) => {
    const  otp  = req.body.otp
    if (!otp) return res.status(400).send({ message: "Please Enter OTP" })

    const userId=req.user._id
    console.log(userId);

    const user = await User.findOne({ _id: userId })
    if (!user) res.status(400).send({ message: "NO User Exists" })
    if (otp!=user.otp) return res.status(400).send({message : "Invalid Otp"})    
    return  res.status(200).send('OTP Verified Sucessfully')
})

exports.resetPassword=asyncMiddleware( async (req, res) => {

    const { password , confirm_password } = req.body
    if (!password && confirm_password) return res.status(400).send({ message: "Enter All fields" })
    if (password != confirm_password) return res.status(400).send({ message: "Password And Confirm Password doesn't match" })
    const userId = req.user._id
    console.log("userId : ",userId)
    const user = await User.findOne({ _id: userId})
    if (!user) return res.status(400).send({ message: "No user Exists!" })
    const salt = await bcrypt.genSalt(10)
    //  user.password = await bcrypt.hash(user.password, salt);

    const newUser= await user.updateOne({$set:{_id:userId , password:password}})
   return res.status(200).send({message : 'Password changed'})

})

exports.imageUpload=asyncMiddleware( async (req, res) => {
    
const image=req.file || ""
if(!image) return res.status(400).send({message:'Please select image'})
const userId=req.params._id
if(!userId) return res.status(400).send({message:'No User exists'})
const imageToBase64=fs.readFileSync(image.path, 'base64');
const user=await User.findOne({_id:userId})
const newUser= await user.updateOne({$set:{_id:userId , image:imageToBase64}})
return res.status(200).send({message:"Image updated",data:newUser})

})
