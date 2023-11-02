//all file importig here and send to the controller 
import userController from "../../../../Adaptors/controller/user/userController.js"
import userRepositoryInterface from "../../../../Application/repo/user/userRepoInterface.js"
import userRepositoryImplements from "../../../database/mongodb/repositories/user/userRepositoryImpl.js"
import userServiceInterface from "../../../../Application/srv/user/userSrvInterface.js"
import userServiceImplements from "../../../services/user/userServiceImpl.js"
import validation from "../../../../custom-middlewares/user/validation.js"

const useRoutes=(express)=>{
    console.log('reach user routes')

    const router=express.Router()
    const app=express()

    const controller=userController(userRepositoryInterface,userRepositoryImplements,userServiceInterface,userServiceImplements)

    // app.get('/register',controller.register)
    router.route('/register').post(validation,controller.register) 


    
    return router
        

}

export default useRoutes
