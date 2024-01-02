import dotenv from "dotenv"
dotenv.config()

export default{

    AWS_ACCESSKEY:process.env.AWS_ACCESSKEY,
    AWS_SECRETKEY:process.env.AWS_SECRETKEY,
    MONGO_URI:process.env.MONGO_URI
 

}