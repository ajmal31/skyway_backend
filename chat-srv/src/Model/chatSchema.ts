import mongoose from 'mongoose'
const {Schema}=mongoose

const chatModel=new Schema({

    senderId:{type:Schema.Types.ObjectId,required:true,},
    receiverId:{type:Schema.Types.ObjectId,required:true},
    message:[
       {
        type:Schema.Types.ObjectId,
        ref:"messages"
       }
    ]

},{
    timestamps:true
})

export const chatSchema=mongoose.model('chats',chatModel)
