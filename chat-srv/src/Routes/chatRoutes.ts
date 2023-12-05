import { Router } from "express"
import {createChat,sendMessage,getChat } from "../controller/chatController"
const chatRoutes=(express:any):Router=>{


    const router=express.Router()
   //POST METHODS
    router.route('/createChat').post(createChat)

    router.route('/sendMessage').post(sendMessage)

    router.route('/getChat').post(getChat)

    return router

}

export default chatRoutes