//import all usecases  here
import registerUser from "../../../Application/usecase/user/Register.js"
import userLogin from "../../../Application/usecase/user/Login.js"
import softDelete from "../../../Application/usecase/user/softDelete.js"
import findOneUser from "../../../Application/usecase/user/getUser.js"
import googleWithLogin from "../../../Application/usecase/user/googleLogin.js"
import connectUser from "../../../Application/usecase/user/connectUser.js"
import updateUSer from "../../../Application/usecase/user/update.js"
import takeAllUsers from "../../../Application/usecase/user/getAllUsers.js"
import takeAllConnectedUsers from "../../../Application/usecase/user/takeAllConnectedUsers.js"
import userStatusChange from "../../../Application/usecase/user/changeUserStatus.js"
import takeUserUpdateChat from "../../../Application/usecase/user/getUserUpdateChat.js"
import takeConnectedVenture from "../../../Application/usecase/user/getConnectedVenture.js"
import takeAllConnectedVentures from "../../../Application/usecase/user/getAllConnectedVentures.js"
import takeAllGenuineUsers from "../../../Application/usecase/user/takeAllGenuineUsers.js"
import phoneNumberVerified from "../../../Application/usecase/user/phoneNumberVerified.js"
import { uploadFile } from "../../../s3/index.js"
import FailedOtp from "../../../Application/usecase/user/otpFailed.js"
import documentUploading from "../../../Application/usecase/user/documentUploading.js"

const userController = (repositoryInterface, repositoryImplements, serviceInterface, userServiceImplements) => {

    //user repo and implements assign to dbRepository
    const dbRepository = repositoryInterface(repositoryImplements())
    //user service and implements assign service 
    const service = serviceInterface(userServiceImplements())


    //register
    const register = async (req, res) => {

        try {
            const response = await registerUser(dbRepository, service, req.body)

            if (!response.message) res.json({ response }).status(200)
            else {
                console.log('reponse got hear', response)
                res.json({ message: response.message }).status(403)
            }

        } catch (err) {

            console.log('error ocuured while getin reponse realted user register', err)
        }


    }
    //login
    const login = async (req, res) => {


        let { email, password } = req.body

        const response = await userLogin(dbRepository, service, email, password)
        const {username,token,userId}=response
        if (response.password && response.userExist) return res.json({ message: 'user Logged in succesful', authToken: token, username: username,userId })
        else if (response.userExist && !response.password) return res.json({ message: 'please enter your valid password' })
        else return res.json({ message: 'user does not exist' })

    }

    //Google Authentication
    const googleLogin = async (req, res) => {


        try {

            const { encodedData } = req.body
            const response = await googleWithLogin(dbRepository, service, encodedData)
            console.log('response is controller', response)
            if (response.token) return res.json({ message: "user Logged in succesful", authToken: response.token, username: response.username })
            else return res.json({ message: "user does not exist" })

        } catch (err) {
            console.log('error occured in controler related while receiving goog login response ', err)
        }



    }
     //user make connection request for particular venture
    const callRequested = async (req, res) => {

        

        const uid = req.userdata.userId
        const vid = req.body.ventureId
        

        const response = await connectUser(dbRepository, uid, vid)
        return res.json(response)


    }

    //GET METHODS 👇

    //delete user (soft delete)
    const remove = async (req, res) => {

        const userId = req.params.id
        const response = await softDelete(userId, dbRepository)
        if (response) res.json({ message: 'user deleted succeful' })


    }
    //get particular user
    const getUser = async (req, res) => {
        const userId = req?.userdata?.userId
        console.log(userId)
        const response = await findOneUser(userId, dbRepository)
        return response ? res.json({ response }) : res.json({ message: "did'nt get user details" })
    }

    //PUT METHODS

    //update user
    const update = async (req, res) => {

    
        const response = await updateUSer(req.body, dbRepository, service)
        console.log('response in controller',response)
        return res.json({ response })

    }
    //taking All users 
    const getAllusers = async (req, res) => {

        const response = await takeAllUsers(dbRepository)
        return res.json({ response })
    }

    //get All connected users
    const getAllConnectedUsers = async (req, res) => {


        const vid = req?.userdata?._id
        const response = await takeAllConnectedUsers(dbRepository, vid)
        console.log('all connected users',response)
        if (response) return res.json({ users: response, ventureId: vid })

    }
    //change user Status
    const changeUserStatus = async (req, res) => {
        
        const ventureId = req?.userdata?._id
        const { userId, status } = req?.body
        const response = await userStatusChange(status, userId, ventureId, dbRepository)
        
        return res.json(response)
    }
    //Take user data and send to chat service
    const getUserUpdateChat=async (req,res)=>{
         
        const {userId}=req.body
        const response=await takeUserUpdateChat(userId,dbRepository)
        if(!response)return res.json({message:"data not published to chat service"})
        else return res.json(response)

    }
    //take connected venture
    const getConnectedVenture=async (req,res)=>{


        const {senderId,receiverId}=req?.body
        console.log('reach',senderId,receiverId)
        const response=await takeConnectedVenture(dbRepository,senderId,receiverId)
        return res.json({response})
    }
    //take All Connected Venture Based on user Id for listing chat in user side
    const getAllConnectedVentures=async(req,res)=>{

        const {userId}=req?.userdata
        const response=await takeAllConnectedVentures(dbRepository,userId)
        return res.json({response})

    }
    //taking All genuine user based on partiulcar ventureId
    const getAllGenuineUsers=async(req,res)=>{

        const vid=req.userdata._id
        const response=await takeAllGenuineUsers(dbRepository,vid)
        if(response.length<1)return res.json({message:'no Allowed user for you'})
        return res.json({response})

    }
    const numberVerified=async(req,res)=>{

        const {userId}=req.userdata
        console.log('userId in controler',userId)
        const response=await phoneNumberVerified(dbRepository,userId)
        return res.json(response)
    }
    //document uploading
      //test route written check whether it uploading to s3 is working or not
    const upload = async (req, res) => {

    const file = req.files
    const result=await uploadFile(file)
    
    const {userId}=req.userdata
    let response=await documentUploading(dbRepository,result,userId)

    return res.json(response)

    }
    const otpFailed=async(req,res)=>{

        const{userId}=req.userdata
        const response=await FailedOtp(dbRepository,userId)
   
     }


    return {
        otpFailed,
        upload,
        numberVerified,
        getAllGenuineUsers,
        getAllConnectedVentures,
        getConnectedVenture,
        getUserUpdateChat,
        changeUserStatus,
        getAllConnectedUsers,
        getAllusers,
        callRequested,
        googleLogin,
        update,
        getUser,
        remove,
        register,
        login
    }





}

export default userController