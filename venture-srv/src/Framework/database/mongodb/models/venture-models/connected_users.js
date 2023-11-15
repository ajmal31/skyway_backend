import mongoose from 'mongoose'

const {Schema} =mongoose

const connectedUserSchema=new Schema({
    
    ventureId:String,
    users:[]        
},{
    timestamps:true
})

const connectedUserModel=mongoose.model('connected_users',connectedUserSchema)
export default connectedUserModel
