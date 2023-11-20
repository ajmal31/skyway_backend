import mongoose from 'mongoose'
const connection=(uri:string)=>{
    
    //connecting mongodb 
     mongoose.connect(uri)
    
     mongoose.connection.once('open',()=>{

        console.log('Admin Service  Mongodb connection Succesfull👽👻')
     })

     mongoose.connection.on('error',(err)=>{

        console.log('Error Occured While Connection Database Mongodb',err)

     })



}

export default connection