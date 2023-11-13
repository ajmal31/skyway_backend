//all file importig here and send to the controller 
import ventureController from "../../../../Adaptors/controller/venture/ventureController.js"
import ventureRepositoryInterface from "../../../../Application/repo/venture/ventureRepoInterface.js"
import ventureServiceInterface from "../../../../Application/srv/venture/ventureSrvInterface.js"
import ventureRepositoryImplements from "../../../database/mongodb/repositories/venture/ventureRepositoryImpl.js"
import ventureServiceImplements from "../../../services/venture/ventureServiceImpl.js"



const ventureRoutes=(express)=>{
  

    const router=express.Router()
    const app=express()

    //Passing interface and implments to controller
    const controller=ventureController(ventureRepositoryInterface,ventureRepositoryImplements,ventureServiceInterface,ventureServiceImplements)

    
   //POST methods
   router.route('/register').post(controller.register)


    return router
        

}

export default ventureRoutes
