import mongoose from 'mongoose'

const {Schema} =mongoose

const connectedUserSchema=new Schema({
    
    ventureId:Schema.Types.ObjectId,
    users:[
        {
            userId:Schema.Types.ObjectId,
            status:String
        }
    ]        
},{
    timestamps:true
})

const connectedUserModel=mongoose.model('connected_users',connectedUserSchema)
export default connectedUserModel