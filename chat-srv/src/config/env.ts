import env from "dotenv"
env.config()
export default {

    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI

}