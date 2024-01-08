import dotenv from "dotenv"
dotenv.config()

export default{

   MONGO_URI:process.env.MONGO_URI,
   APPLICATION_PORT:process.env.APPLICATION_PORT
      
}