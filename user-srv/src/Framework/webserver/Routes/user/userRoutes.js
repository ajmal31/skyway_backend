//all file importig here and send to the controller 
import userController from "../../../../Adaptors/controller/user/userController.js"
import userRepositoryInterface from "../../../../Application/repo/user/userRepoInterface.js"
import userRepositoryImplements from "../../../database/mongodb/repositories/user/userRepositoryImpl.js"
import userServiceInterface from "../../../../Application/srv/user/userSrvInterface.js"
import userServiceImplements from "../../../services/user/userServiceImpl.js"
import registerValidation from "../../../../custom-middlewares/user/registerValidation.js"
import loginValidation from "../../../../custom-middlewares/user/loginvalidation.js"
import multer from "multer"


//my own middleware
import {jwtVerfication} from "jwt-verification-middleware" 
const userSecret='ajmal123user-srv'
const ventureSecret="ajmal123venture-srv"

const upload = multer({ storage: multer.memoryStorage() });
const useRoutes=(express)=>{
  

    const router=express.Router()
    const app=express()

    //Passing interface and implments to controller
    const controller=userController(userRepositoryInterface,userRepositoryImplements,userServiceInterface,userServiceImplements)
     

    //Authentication base methods
    router.route('/register').post(registerValidation,controller.register) 
    router.route('/login').post(loginValidation,controller.login)
    router.route('/googleLogin').post(controller.googleLogin)


    
    
    //MIDDLEWARE/  !!!notice!! this is not working while setup globally but it working while writing along with each route
    app.use(jwtVerfication('ajmal123user-srv'))

    //User Requesting to a venture for connecting
    router.route('/callRequested').post(jwtVerfication(userSecret),controller.callRequested)

    //USER-SERVICE👇

    //delete user account (soft delete)
    router.route('/delete/:id').get(controller.remove)
    //take one user
    router.route('/getUser').get(jwtVerfication(userSecret),controller.getUser)
    //taking all users
    router.route('/getAllUsers').get(controller.getAllusers)
    //take one venture (from replicated venture data)
    router.route('/getConnectedVenture').post(controller.getConnectedVenture)
    //should be check user valid or not
    router.route('/getAllConnectedVentures').get(jwtVerfication(userSecret),controller.getAllConnectedVentures)
    //taking user details and publish data to chat-srv - CHAT-SERVICE
    router.route('/getUserUpdateChat').post(controller.getUserUpdateChat)
    //verified phone number
    router.route('/numberVerified').get(jwtVerfication(userSecret),controller.numberVerified)
    router.route('/otpFailed').get(jwtVerfication(userSecret),controller.otpFailed)



    //FOR VENTURE SERVICE👇

    //taking all usres
    router.route('/getAllConnectedUsers').get(jwtVerfication(ventureSecret),controller.getAllConnectedUsers)
    //venture allowed user request 
    router.route('/changeUserStatus').post(jwtVerfication(ventureSecret),controller.changeUserStatus)

    //FOR CHAT SERVICE

    //take all allowed users based on a venture Id for listing in chat
    router.route('/getAllGenuineUsers').get(jwtVerfication(ventureSecret),controller.getAllGenuineUsers)

    router.route('/updateUser').post(registerValidation ,controller.update)


    //document uploading
    router.route('/upload').post(upload.array("file"),controller.upload)


 

    
   

    
    return router
        

}

export default useRoutes
