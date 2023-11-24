//import all usecases  here
import ventureRegister from "../../../Application/usecase/venture/register.js"
import connectUser from "../../../Application/usecase/venture/connectUser.js"
import listVentures from "../../../Application/usecase/venture/getAllVentures.js"
import ventureLogin from "../../../Application/usecase/venture/ventureLogin.js"
import takeAllUsers from "../../../Application/usecase/venture/takeAllUsers.js"

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
    return res.json({ response })

  }
  //test route written check whether it uploading to s3 is working or not
  // const upload=async(req,res)=>{

  //   const uploadedFiles=req.files.map(file=>{
  //     return{
  //       orginalName:file.orginalName,
  //       location:file.location
  //     }
  //   })

  //   console.log('uploaded files',uploadedFiles)

  //   res.json({message:'image uploaded succesfulll',uploadedFiles})



  // }
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

    const {_id}=req.userdata

    const data = await takeAllUsers(dbRepo,_id)
    return res.json({data})

  }

  return {
    getAllUsers,
    getAllVentures,
    callRequested,
    register,
    login

  }

}

export default ventureController