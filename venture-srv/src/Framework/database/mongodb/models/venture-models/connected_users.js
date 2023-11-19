import mongoose from 'mongoose'

const {Schema} =mongoose

const connectedUserSchema=new Schema({
    
    ventureId:Schema.Types.ObjectId,
    users:[
       
    ]        
},{
    timestamps:true
})

const connectedUserModel=mongoose.model('connected_users',connectedUserSchema)
export default connectedUserModel