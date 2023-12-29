import dotenv from "dotenv"
dotenv.config()

export default{

    AWS_ACCESSKEY:process.env.AWS_ACCESSKEY,
    AWS_SECRETKEY:process.env.AWS_SECRETKEY,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY,
    MONGO_URI:process.env.MONGO_URI,
    APPLICATION_PORT:process.env.APPLICATION_PORT,
    JWT_ADMIN_SECRET_KEY:process.env.JWT_ADMIN_SECRET_KEY,
    JWT_USER_SECRET_KEY:process.env.JWT_USER_SECRET_KEY,


}