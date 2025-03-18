const router=require('express').Router()
const chatmodel=require('../models/chatmodel')
const Authmiddleware=require('../middlewares/auth')
router.post('/create-new-chat',Authmiddleware,async(req,res)=>{
    try{
        const newchat=new chatmodel(req.body)
     
        const savedchat=await newchat.save()
        return res.status(201).send({
            message:"chat created successfully",
            success:true,
            data:savedchat
        })
    }
    catch(error){
        return res.status(400).send({
            message:error.message,
            sucess:false
        })
    }
})
router.get('/get-all-chats',Authmiddleware,async(req,res)=>{
    try{
       console.log(req.body) 
       const allchat =await chatmodel.find({
            members:{$in : req.body.userId}
        })
        return res.status(200).send({
            message:"all char fetch succesfully",
            success:true,
            data:allchat
        })

    }
    catch(error){
        return res.status(400).send({
            message:error.message,
            success:false
        })

    }
})
module.exports=router;