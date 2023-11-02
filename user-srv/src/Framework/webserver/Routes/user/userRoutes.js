//all file importig here and send to the controller 
import userController from "../../../../Adaptors/controller/user/userController.js"
import userRepositoryInterface from "../../../../Application/repo/user/userRepoInterface.js"
import userRepositoryImplements from "../../../database/mongodb/repositories/user/userRepositoryImpl.js"
import userServiceInterface from "../../../../Application/srv/user/userSrvInterface.js"
import userServiceImplements from "../../../services/user/userServiceImpl.js"
import registerValidation from "../../../../custom-middlewares/user/registerValidation.js"
import loginValidation from "../../../../custom-middlewares/user/loginvalidation.js"

const useRoutes=(express)=>{
  

    const router=express.Router()
    const app=express()

    //Passing interface and implments to controller
    const controller=userController(userRepositoryInterface,userRepositoryImplements,userServiceInterface,userServiceImplements)

    //POST METHODS
    router.route('/register').post(registerValidation,controller.register) 
    router.route('/login').post(loginValidation,controller.login)


    
    return router
        

}

export default useRoutes
