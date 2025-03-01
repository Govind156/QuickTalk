const mongoose=require('mongoose')
const chatschema=new mongoose.Schema({
    members:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            }
        ]
    },
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messages"
    },
    unreadMessageCount:{
        type:Number,
        default:0
    }
},{timestamps:true})
const chatmodel=mongoose.model("chats",chatschema)
module.exports=chatmodel;