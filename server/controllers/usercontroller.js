const express=require('express')
const router=express.Router()
const authmiddleware=require('../middlewares/auth')
const usermodel=require('../models/usermodel')
router.get('/get-logged-user',authmiddleware,async(req,res)=>{
    try{
        const user=await usermodel.findOne({_id:req.body.userId})
        return res.send({
            message:"user fetch successfully",
            success:true,
            data:user
        })

    }
    catch(error){
       return res.send({
        message:error.message,
        success:false
       })
    }
})
router.get('/get-all-users',authmiddleware,async(req,res)=>{
    try{
        const userid=req.body.userId
        const allUsers=await usermodel.find({
                       _id:{$ne : userid}
        })
        return res.send({
            message:"all users fetch successfully",
            success:true,
            data:allUsers
        })
    }
    catch(error){
        return res.send({
            message:error.message,
            success:false
        })

    }


})
module.exports=router