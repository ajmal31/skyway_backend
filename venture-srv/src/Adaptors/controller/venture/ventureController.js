//import all usecases  here
import ventureRegister from "../../../Application/usecase/venture/register.js"
import connectUser from "../../../Application/usecase/venture/connectUser.js"
import listVentures from "../../../Application/usecase/venture/getAllVentures.js"
import ventureLogin from "../../../Application/usecase/venture/ventureLogin.js"
import takeAllUsers from "../../../Application/usecase/venture/takeAllUsers.js"
import takeOneVenture from "../../../Application/usecase/venture/takeOneVenture.js"
import takeVentureUpdateChat from "../../../Application/usecase/venture/getVentureUpdate.js"
import venturesTotalCount from "../../../Application/usecase/venture/ventureTotal.js"
import countVenturesBasedOnStatus from "../../../Application/usecase/venture/ventureCountByStatus.js"
import takeVenturesByContry from "../../../Application/usecase/venture/getVenturesByCountry.js"
import findAllContries from "../../../Application/srv/venture/getAllContries.js"
import addNewComment from "../../../Application/usecase/venture/createComment.js"
import takeAllComments from "../../../Application/usecase/venture/getAllComments.js"

import ventureStatusUpdate from "../../../Application/usecase/venture/updateVentureStatus.js"
const ventureController = (repositoryInterface, repositoryImplements, serviceInterface, ServiceImplements) => {

  //Repo interface and implements assign to a dbRepo
  const dbRepo = repositoryInterface(repositoryImplements())
  //service interface and implements assign to a service
  const service = serviceInterface(ServiceImplements())


  //POST METHODS

  const register = async (req, res) => {


    const response = await ventureRegister(dbRepo, service, req.body)
    console.log(response, 'response in controller')
    if (response?.error) return res.json({ error: response?.error })
    return res.json({ success: response?.success })

  }
  //❗❗❗
  const callRequested = async (req, res) => {

    console.log('user details', req.userdata)

    const uid = req.userdata.userId
    const vid = req.body.ventureId

    const response = await connectUser(dbRepo, uid, vid)
    if (!response) return res.json({ message: 'User Already requested this company' })
    return res.json({ message: 'You request send to the company ..they will contact you as soon as possible' })


  }
  //Taking all Venture Details
  const getAllVentures = async (req, res) => {
    const response = await listVentures(dbRepo, req?.body?.type)
    return res.json({ response })

  }
  //Venture login
  const login = async (req, res) => {

    const response = await ventureLogin(dbRepo, service, req.body)

    if (response === null) return res.json({ message: 'venture does not exist' })

    const { token, ventureName, admin_allowed, ventureId, rejected } = response

    if (response?.loggedIn) return res.json({ message: 'venture login succesful', token, ventureName, admin_allowed, ventureId, rejected })
    else if (response?.password_one) return res.json({ message: 'please check you second Password' })
    return res.json({ message: 'please check your first password' })
  }

  //Take all users Based on Particular Venture 
  const getAllUsers = async (req, res) => {

    const { _id } = req.userdata

    const data = await takeAllUsers(dbRepo, _id)
    return res.json({ data })

  }
  //Taking One Venture Details
  const getOneVenture = async (req, res) => {

    let vid
    if (req?.params?.id) vid = req.params.id
    else vid = req?.userdata?._id
    const response = await takeOneVenture(dbRepo, vid)
    if (!response) return console.log('vnture details not found')
    return res.json(response)

  }
  //Update venture status if venture allowed or no
  const updateVentureStatus = async (req, res) => {


    const response = await ventureStatusUpdate(dbRepo, req?.body)

    if (response) return res.json(response)

  }
  //getParticualar venture and Publish data to chat -service 
  const getVentureUpdateChat = async (req, res) => {
    const { vid } = req?.body
    if (!vid) return res.json({ message: "id is not provided" }).status(401)
    const response = await takeVentureUpdateChat(vid, dbRepo)
    if (!response) return res.json({ message: "data not published to chat-service" })
    else return res.json({ message: "data published to chat-service succeful" })

  }
  const totalVentures = async (req, res) => {

    const response = await venturesTotalCount(dbRepo)
    return res.json(response)

  }
  const venutureCountByStatus = async (req, res) => {

    const { status } = req.body
    const response = await countVenturesBasedOnStatus(dbRepo,status)
    return res.json(response)
  }
  const getVenturesByContries=async(req,res)=>{

    const {type}=req.body
    const {country}=req.params

    const response=await takeVenturesByContry(dbRepo,type,country)
    console.log("response based on country",response)
    return res.json(response)
  }
  const getAllContries=async(req,res)=>{


    const response=await findAllContries(dbRepo)

    return res.json({response})
  }
  const createComment=async(req,res)=>{

    const {userId}=req.userdata

    const response=await addNewComment(dbRepo,req.body,userId)
    return res.json(response)
  }
  //taking all comment based on ventureId
  const getAllComments=async(req,res)=>{

     const {vid}=req.params
     const response=await takeAllComments(dbRepo,vid)
     return res.json(response)
    
  }




  return {
    getAllComments,
    createComment,
    getAllContries,
    getVenturesByContries,
    venutureCountByStatus,
    totalVentures,
    getVentureUpdateChat,
    updateVentureStatus,
    getOneVenture,
    getAllUsers,
    getAllVentures,
    callRequested,
    register,
    login

  }

}

export default ventureController