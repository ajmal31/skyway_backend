import mongoose from "mongoose"
const connection=(mongo_uri)=>{

   

    mongoose.connect(mongo_uri)

    mongoose.connection.once("open",()=>{

        console.log('mongodb connection success')

    })
    mongoose.connection.on('error',(err)=>{
        console.log('error occured while connecting mongodb ',err)
    })
    
    

}
export default connection