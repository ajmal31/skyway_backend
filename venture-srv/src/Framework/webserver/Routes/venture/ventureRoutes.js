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


const upload = multer({ storage: multer.memoryStorage() });

const ventureRoutes=(express)=>{
  

    const router=express.Router()
    const app=express()

    //Passing interface and implments to controller
    const controller=ventureController(ventureRepositoryInterface,ventureRepositoryImplements,ventureServiceInterface,ventureServiceImplements)

       
   //POST methods
   router.route('/register').post(register_validation,controller.register)
   router.route('/login').post(controller.login)
   router.route('/updateVentureStatus').post(controller.updateVentureStatus)
   router.route('/getVentureUpdateChat/user').post(jwtVerfication(env.JWT_USER_SECRET_KEY),controller.getVentureUpdateChat)
   router.route('/getVentureUpdateChat/venture').post(jwtVerfication(env.JWT_SECRETKEY),controller.getVentureUpdateChat)
   router.route('/getAllventures').post(controller.getAllVentures)



   router.route('/getOneVenture').get(jwtVerfication(env.JWT_SECRETKEY),controller.getOneVenture)
   router.route('/getOneVenture/admin/:id').get(jwtVerfication(env.JWT_ADMIN_SECRET_KEY),controller.getOneVenture)
   router.route('/getOneVenture/:id').get(controller.getOneVenture)
   router.route('/getAllUsers').get(jwtVerfication(env.JWT_SECRETKEY),controller.getAllUsers)
   
   
    //test route
     router.route('/upload').post(upload.array("file"),controller.upload)


    return router
        
   
}

export default ventureRoutes
