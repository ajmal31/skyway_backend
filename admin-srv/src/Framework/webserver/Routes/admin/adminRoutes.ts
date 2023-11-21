import { Express,Router } from "express"
import adminController from "../../../../Adaptors/controller/admin/controller"
import adminRepInterface from "../../../../Application/repository/adminRepoInterface"
import adminServiceInterface from "../../../../Application/service/adminServiceInterface"
import serviceImplements from "../../../services/user/serviceImpl"
import repositoryImplements from "../../../database/mongodb/repositories/respositoryImpl"
const adminRoutes=(express:any):Router=>{

    const router=express.Router()
    const app=express()

    //Invoking Controller assign to a Varaible

    const controller=adminController(adminRepInterface,repositoryImplements,adminServiceInterface,serviceImplements)


    //POST METHODS

    router.route('/login').post(controller.login)
    

   

    return router
    


}

export default adminRoutes