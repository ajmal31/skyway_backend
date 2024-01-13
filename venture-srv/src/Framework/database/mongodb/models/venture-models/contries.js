import mongoose from "mongoose"
const {Schema} = mongoose

const contriesModel=new Schema({

    countries:[]
})

export const contriesSchema=mongoose.model("contries",contriesModel)