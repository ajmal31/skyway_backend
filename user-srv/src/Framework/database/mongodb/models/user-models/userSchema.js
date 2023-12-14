import mongoose from "mongoose"

const {Schema}=mongoose

const userSchema=new Schema({

    username: {type: String ,required: true},
    email: { type: String ,required :true ,unique:true },
    phone:{type: Number, required:true ,unique:true},
    region:{ type: String , required:true },
    destination: {type: String ,required :true},
    date_of_birth:{type: Date},
    password:{type:String,required:true},
    confirm_password:{type: String, required:true},
    soft_delete: {type: Boolean ,default:false},
    phone_verification:{type:Boolean ,default :false},
    ventures:[
        
    ]
    



}); 

export const userModel=mongoose.model('skyway-users',userSchema)