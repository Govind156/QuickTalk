const mongoose=require('mongoose')
const messageschema=new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chats"
    },
    text:{
        type:String,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    read:{
        type:Boolean,
        default:0
    }
},{timestamps:true})
module.exports=mongoose.model("messages",messageschema);