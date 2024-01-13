import mongoose from "mongoose"
const {Schema} =mongoose

const paymentHistoryModel=new Schema({

    userId:{type:String,required:true},
    ventureId:{type:String,required:true},
    amount:{type:Number,required:true},
  
    
})

export const paymentHistory=mongoose.model("service-payments-history",paymentHistoryModel)