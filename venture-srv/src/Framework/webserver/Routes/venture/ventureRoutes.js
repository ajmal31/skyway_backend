//all file importig here and send to the controller 
import ventureController from "../../../../Adaptors/controller/venture/ventureController.js"
import ventureRepositoryInterface from "../../../../Application/repo/venture/ventureRepoInterface.js"
import ventureServiceInterface from "../../../../Application/srv/venture/ventureSrvInterface.js"
import ventureRepositoryImplements from "../../../database/mongodb/repositories/venture/ventureRepositoryImpl.js"
import ventureServiceImplements from "../../../services/venture/ventureServiceImpl.js"
import {jwtVerfication} from "jwt-verification-middleware"
import register_validation from "../../../../custome-middlewares/Register_validation.js"
import multer,{memoryStorage} from "multer"
import env from "../../../../config/env.js"

const storage=memoryStorage()
const upload=multer({storage})

const ventureRoutes=(express)=>{
  

    const router=express.Router()
    const app=express()

    //Passing interface and implments to controller
    const controller=ventureController(ventureRepositoryInterface,ventureRepositoryImplements,ventureServiceInterface,ventureServiceImplements)

    
   //POST methods
   router.route('/register').post(register_validation,controller.register)
   router.route('/login').post(controller.login)

   router.route('/getOneVenture/:id').get(controller.getOneVenture)



   //GET ALL VENTURES
   router.route('/getAllventures').get(controller.getAllVentures)
   router.route('/getAllUsers').get(jwtVerfication(env.JWT_SECRETKEY),controller.getAllUsers)
   
   

   //test route
//    router.route('/upload').post(uploadImage.array('file',2),controller.upload)
   router.route('/upload').post(upload.single("file"),controller.upload)


    return router
        
   
}

export default ventureRoutes
