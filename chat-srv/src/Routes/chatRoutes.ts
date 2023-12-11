import { Router } from "express"
import { createChat, sendMessage, getChat, getAllChats, updateChatersDetails } from "../controller/chatController"
import jwtVerify from "../middleware/auth"
import env from "../config/env"
import express from "express"


const chatRoutes = (expres: any): Router => {


    const router = express.Router()
    const app = express()
    //un Validate API's

    //Post Methods    
    router.route('/createChat').post(createChat)
    router.route('/sendMessage').post(sendMessage)
    router.route('/updateChatersDetails').post(updateChatersDetails)



    //Validate User Based Methods
    // app.use(jwtVerify(env.USER_SRV_TOKEN_SECRET_KEY))

    //post methods
    router.route('/getChat/user').post(jwtVerify(env.USER_SRV_TOKEN_SECRET_KEY),getChat)
    router.route('/getChat/venture').post(jwtVerify(env.VENTURE_SRV_TOKEN_SECRET_KEY),getChat)

    //Get Methods
    router.route('/getAllChats').get(getAllChats)



    return router

}

export default chatRoutes