import mongoose from "mongoose"

const {Schema}=mongoose

const messageModel=new Schema ({

    senderId:{type:Schema.Types.ObjectId,required:true},
    receiverId:{type:Schema.Types.ObjectId,required:true},
    content:{type:String,required:true},
    read:{type:Boolean , required:true ,default:false}

},{
    timestamps:true
})
export const messageSchema=mongoose.model('messages',messageModel)