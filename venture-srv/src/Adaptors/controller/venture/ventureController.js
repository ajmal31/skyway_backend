//import all usecases  here
import ventureRegister from "../../../Application/usecase/venture/register.js"
import connectUser from "../../../Application/usecase/venture/connectUser.js"
import listVentures from "../../../Application/usecase/venture/getAllVentures.js"
import ventureLogin from "../../../Application/usecase/venture/ventureLogin.js"
import takeAllUsers from "../../../Application/usecase/venture/takeAllUsers.js"
import takeOneVenture from "../../../Application/usecase/venture/takeOneVenture.js"
import takeVentureUpdateChat from "../../../Application/usecase/venture/getVentureUpdate.js"
import { uploadFile } from "../../../s3/index.js"

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
  //test route written check whether it uploading to s3 is working or not
  const upload = async (req, res) => {

    const file = req.files
    // console.log('govId', file[0])
    // console.log('adhar card', file[1])
    // console.log('pan', file[2])
    // console.log('passport', file[3])
    console.log('file', file)
    const result=await uploadFile(file)
    console.log('after uploading ',result)




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

    const { token, ventureName, admin_allowed, ventureId,rejected } = response

    if (response?.loggedIn) return res.json({ message: 'venture login succesful', token, ventureName, admin_allowed, ventureId,rejected })
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

  


  return {

    getVentureUpdateChat,
    updateVentureStatus,
    upload,
    getOneVenture,
    getAllUsers,
    getAllVentures,
    callRequested,
    register,
    login

  }

}

export default ventureController