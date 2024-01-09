import mongoose from "mongoose"
const {Schema} =mongoose

const commentModel=new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'skyway-users',
    },

    content:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
export const commentSchema=mongoose.model('comments',commentModel)