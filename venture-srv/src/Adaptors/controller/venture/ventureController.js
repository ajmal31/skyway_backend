//import all usecases  here
import ventureRegister from "../../../Application/usecase/venture/register.js"
import connectUser from "../../../Application/usecase/venture/connectUser.js"
import listVentures from "../../../Application/usecase/venture/getAllVentures.js"
import ventureLogin from "../../../Application/usecase/venture/ventureLogin.js"
import takeAllUsers from "../../../Application/usecase/venture/takeAllUsers.js"
import takeOneVenture from "../../../Application/usecase/venture/takeOneVenture.js"
import { uploadS3 } from "../../../multer/index.js"
import { getUrl } from "../../../multer/index.js"
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

    const { file } = req
    console.log('file', file)
    const { error, key } = getUrl()
    if (error) console.log('error occured while uploading to s3 in controller', error)
    else console.log('succesfull uploaded to s3 ', key)



  }
  const callRequested = async (req, res) => {

    console.log('user details', req.userdata)

    const uid = req.userdata.userId
    const vid = req.body.ventureId

    const response = await connectUser(dbRepo, uid, vid)
    if (!response) return res.json({ message: 'User Already requested this company' })
    return res.json({ message: 'You request send to the company ..they will contact you as soon as possible' })


  }
  const getAllVentures = async (req, res) => {

    const response = await listVentures(dbRepo)
    return res.json({ response })

  }
  const login = async (req, res) => {

    const response = await ventureLogin(dbRepo, service, req.body)
    console.log('incontrooler', response)

    if (response === null) return res.json({ message: 'venture does not exist' })

    const { token, ventureName, pending } = response

    if (response?.loggedIn) return res.json({ message: 'venture login succesful', token, ventureName, pending })
    else if (response?.password_one) return res.json({ message: 'please check you second Password' })
    return res.json({ message: 'please check your first password' })
  }

  const getAllUsers = async (req, res) => {

    const { _id } = req.userdata

    const data = await takeAllUsers(dbRepo, _id)
    return res.json({ data })

  }
  const getOneVenture = async (req, res) => {

    const vid = req.params.id
    const response = await takeOneVenture(dbRepo, vid)
    if (!response) return console.log('vnture details not found')
    return res.json(response)

  }
  //Update venture status if venture allowed or no
  const updateVentureStatus=async(req,res)=>{


    const response=await ventureStatusUpdate(dbRepo,req?.body)
    if(response) return res.json(response)

   } 


  return {
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