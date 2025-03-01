const router=require('express').Router()
const bcryptjs=require('bcryptjs')
const usermodel=require('../models/usermodel')
const jwt=require('jsonwebtoken')
const { SendEmail } = require('../middlewares/sendtransporter')
const { Sendverificationcode,WelcomeEmail} = require('../middlewares/sendemail')
const ZEROBOUNCE_API_KEY=process.env.ZEROBOUNCE_API_KEY;

const axios = require("axios");

router.post('/signup',async(req,res)=>{
    try{
        const {email,password,firstName,LastName}=req.body
        if(!email || !password || !firstName || !LastName){
            return res.send({
                message:"all fields are mandatory",
                success:false
            })
        }

        //1. find user
         const user =await usermodel.findOne({email:req.body.email})
        
         //2. if user already exist then send failure message
        if(user){
            return res.send({
                message:"user already exist",
                success:false
            })
        }
        
         // Verify Email with ZeroBounce
        //  const emailCheck = await axios.get(
        //     `https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${email}`
        // );
        // console.log("emailcheck=",emailCheck);
        // if (emailCheck.data.status !== "valid") {
        //     return res.send({ message: "Invalid or non-existent email", success: false });
        // }

        //3.if not first bcrypt the password
        const hashedpassword=await bcryptjs.hash(req.body.password,15)
        req.body.password=hashedpassword
        const verificationcode=Math.floor(100000+Math.random() *900000).toString()
        req.body.verificationcode=verificationcode;
        //4.store and save it
        const newuser=new usermodel(req.body)
        await newuser.save();
        // SendEmail(newuser.email);
        Sendverificationcode(newuser.email,newuser.verificationcode);
        // return res.redirect('VerifySignup')
        return res.status(201).send({
            message:'user created successfully',
            success:true,
            data:newuser
        })
    }
    catch(error){
        return res.send({
            message:error.message,
            success:false
        })
    }
})
router.post('/login',async (req,res)=>{
    try{
        //1.check if user exist
        // const user=await usermodel.findOne({email:req.body.email})
        const user = await usermodel.findOne({ email: req.body.email }).select("+password");
        // console.log(user.email)
        // console.log(user.password)

        if(!user){
            return res.send({
                message:"user not exist",
                success:false
            })
        } 
        //2.check if password is correct
        const isvalid=await bcryptjs.compare(req.body.password,user.password)
        if(!isvalid){
            return res.send({
                message:"invalid password",
                success:false
            })
        }
        //  console.log(user.email)
        // console.log(user.password)
        //3.if user exist and password is correct then assign token
        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.send({
            message:"user logged in successfully",
            success:true,
            token:token
        })
    }
    catch(error){
        return res.send({
            message:error.message,
            success:false
        })

    }
})
router.post('/verifysignup',async(req,res)=>{
    try{
        const {verificationcode}=req.body
        const user=await usermodel.findOne({
            verificationcode:verificationcode
        })
        console.log("user=",user);
        if(!user){
            return res.send({
                success:false,
                message:"invalid or expiry code"
            })
        }
        user.isVerified=true;
        user.verificationcode=undefined
        await user.save()
        const name = `${user.firstName} ${user.LastName}`;
        console.log("name send during welcome=",name);
        WelcomeEmail(user.email,name)
        return res.send({
            success:true,
            message:"email verification successfully",
            data:user
        })
    }
    catch(error){
        return res.send({
            message:error.message,
            success:false,
        })
    }
})
module.exports=router