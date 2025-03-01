const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    email:{
       type:String,
       required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8
    },
    ProfilePic:{
        type:String,
        required:false,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationcode:{
        type:String
    }
},{timestamps:true})
const usermodel=mongoose.model('users',userschema)
module.exports=usermodel
