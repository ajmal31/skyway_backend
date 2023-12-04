import { Router } from "express"
import { log } from "../controller/chatController"
const chatRoutes=(express:any):Router=>{


    const router=express.Router()
 
    router.route('/').get(log)

    return router

}

export default chatRoutes