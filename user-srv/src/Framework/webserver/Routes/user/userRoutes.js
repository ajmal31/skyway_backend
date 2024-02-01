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
const userSecret = 'ajmal123user-srv'
const ventureSecret = "ajmal123venture-srv"
const adminSecret= "ajmal123admin-srv"

const upload = multer({ storage: multer.memoryStorage() });
const useRoutes = (express) => {


    const router = express.Router()
    const app = express()

    //Passing interface and implments to controller
    const controller = userController(userRepositoryInterface, userRepositoryImplements, userServiceInterface, userServiceImplements)


    //Authentication base methods
    router.route('/register').post(registerValidation, controller.register)
    router.route('/login').post(loginValidation, controller.login)
    router.route('/googleLogin').post(controller.googleLogin)




    //MIDDLEWARE/  !!!notice!! this is not working while setup globally but it working while writing along with each route
    app.use(jwtVerfication('ajmal123user-srv'))

    //User Requesting to a Venture for Connecting
    router.route('/callRequested').post(jwtVerfication(userSecret), controller.callRequested)

    //USER-SERVICE👇

    //Delete User Account (soft delete)
    router.route('/delete/:id').get(controller.remove)
    //Take One User
    router.route('/getUser').get(jwtVerfication(userSecret), controller.getUser)
    //Taking All users
    router.route('/getAllUsers').get(controller.getAllusers)
    //Take One Venture (from replicated venture data)
    router.route('/getConnectedVenture').post(controller.getConnectedVenture)
    //Should be Check User Valid or Not
    router.route('/get/all/connected/Ventures').get(jwtVerfication(userSecret), controller.getAllConnectedVentures)
    //Taking User Details and Publish Data to Chat-srv - CHAT-SERVICE
    router.route('/getUserUpdateChat/user').post( jwtVerfication(userSecret), controller.getUserUpdateChat)
    router.route('/getUserUpdateChat/venture').post(jwtVerfication(ventureSecret),controller.getUserUpdateChat)
    //Verified Phone number
    router.route('/numberVerified').get(jwtVerfication(userSecret), controller.numberVerified)
    router.route('/otpFailed').get(jwtVerfication(userSecret), controller.otpFailed)
    //Document Uploading
    router.route('/upload').post(jwtVerfication(userSecret), upload.array("file"), controller.upload)
    router.route('/create/comment').post(jwtVerfication(userSecret),controller.createComment)
    router.route('/get/all/comment').get(controller.getAllComments)
    //Uploading User Profile Image
    router.route("/upload/user/profile/image").post(jwtVerfication(userSecret),upload.single("profile-image"),controller.uploadProfileImage)
    
    



    //FOR VENTURE SERVICE👇

    //taking all usres
    router.route('/getAllConnectedUsers').get(jwtVerfication(ventureSecret), controller.getAllConnectedUsers)
    //venture allowed user request 
    router.route('/changeUserStatus').post(jwtVerfication(ventureSecret), controller.changeUserStatus)
    //get one user based on userId
    router.route('/get/one/user/:userId').get(jwtVerfication(ventureSecret),controller.getUser)
    router.route('/venture/service/start').post(jwtVerfication(ventureSecret),controller.ventureServiceStart)
    router.route('/venture/service/completed').post(jwtVerfication(ventureSecret),controller.ventureServiceCompleted)
    router.route("/users/count/by/venture").get(jwtVerfication(ventureSecret),controller.usersCountByVenture)
    router.route("/users/count/by/venture").get(jwtVerfication(ventureSecret),controller.usersCountByVenture)
    router.route("/users/count/by/venture/:status").get(jwtVerfication(ventureSecret),controller.usersCountByVentureByStatus)


    //FOR CHAT SERVICE

    //take all allowed users based on a venture Id for listing in chat
    router.route('/getAllGenuineUsers').get(jwtVerfication(ventureSecret), controller.getAllGenuineUsers)
    router.route('/updateUser').post(registerValidation, controller.update)


    //Admin service
    
    //taking users-count based ventureId and status
    router.route('/venture/users/:status/count/:vid').get(jwtVerfication(adminSecret),controller.getVentureRelatedUsersCount)
    //taking all user-count based on ventureId no matter which status
    router.route("/venture/all/users/count/:vid").get(jwtVerfication(adminSecret),controller.getAllConnectedUsersCount)
    router.route('/users/count').get(jwtVerfication(adminSecret),controller.totalUsers)











    return router


}

export default useRoutes
