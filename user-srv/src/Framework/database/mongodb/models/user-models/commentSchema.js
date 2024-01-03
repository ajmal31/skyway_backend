import mongoose from "mongoose"
const {Schema} =mongoose

const commentModel=new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },

    content:{
        type:String,
        required:true
    }
})
export const commentSchema=mongoose.model('comments',commentModel)