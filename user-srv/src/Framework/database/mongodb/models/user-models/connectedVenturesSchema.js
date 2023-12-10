import mongoose from "mongoose";
const {Schema} =mongoose

const connectedVenturesModel=new Schema({},{strict:false})
export const connectedVenturesSchema=mongoose.model('connectedVentures',connectedVenturesModel)