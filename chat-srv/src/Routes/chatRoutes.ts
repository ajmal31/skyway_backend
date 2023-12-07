import { Router } from "express"
import {createChat,sendMessage,getChat,getAllChats } from "../controller/chatController"
import jwtVerify from "../middleware/auth"
import env from "../config/env"

const chatRoutes=(express:any):Router=>{


    const router=express.Router()
   //POST METHODS    
    router.route('/createChat').post(createChat)

    router.route('/sendMessage').post(sendMessage)
 
    router.route('/getChat').post(getChat)

    //GET METHODS
    router.route('/getAllChats').get(jwtVerify(env.USER_SRV_TOKEN_SECRET_KEY),getAllChats)

    return router

}

export default chatRoutes