import env from "dotenv"
env.config()
export default {

    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    USER_SRV_TOKEN_SECRET_KEY:process.env.USER_SRV_TOKEN_SECRET_KEY,
    

}