import mongoose from 'mongoose'
const {Schema}=mongoose

const chatModel=new Schema({

    senderId:{type:String,required:true,ref:"chaters"},
    receiverId:{type:String,required:true, ref:"chaters"},
    message:[
       {
        type:Schema.Types.ObjectId,
        ref:"messages"
       }
    ],
    lastMessage:{type:Schema.Types.ObjectId ,required:true ,ref:"messages"}

},{
    timestamps:true
})

export const chatSchema=mongoose.model('chats',chatModel)
