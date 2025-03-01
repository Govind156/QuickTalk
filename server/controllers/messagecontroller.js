const router=require('express').Router()
const Authmiddleware=require('../middlewares/auth')
const chatmodel = require('../models/chatmodel')
const messagemodel=require('../models/messagemodel')
router.post('/new-message',Authmiddleware,async(req,res)=>{
    try{
        //create and store new messsage in message collection
        const Newmessage=new messagemodel(req.body)
        const savedMessage=await Newmessage.save()
        //update last message property in that chat present in chat collection
        const currentchat =await chatmodel.findOneAndUpdate(
            {
              _id:req.body.chatId
            },
            {
              lastMessage:savedMessage._id,
              $inc:{unreadMessageCount:1}
            })
        return res.status(201).send({
            message:"message  sent successfully",
            success:true,
            data:savedMessage
        })
    }
    catch(error){
        return res.status(400).send({
            message:error.message,
            success:false
        })
    }
})

router.get('/get-all-messages/:CHATID',Authmiddleware,async(req,res)=>{
    try{
         const allmessage =await messagemodel.find({chatId:req.params.CHATID}).sort({createdAt:1});
         return res.status(201).send({
            message:"all message fetch successfully",
            success:true,
            data:allmessage
         })
    }
    catch(error){
        return res.status(400).send({
            message:error.message,
            success:false
        })
    }
})
module.exports=router