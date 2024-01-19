import mongoose from "mongoose"
const {Schema} =mongoose

const commentModel=new Schema({

    ventureId:{type:Schema.Types.ObjectId,required:true,ref:"ventures"},
    userId:{type:Schema.Types.ObjectId,required:true},
    userName:{type:String,required:true},
    content:{type:String,required:true},
    rating:{type:Number,required:true}

},{
    timestamps:true
})

export const commentSchema=mongoose.model("comments",commentModel)