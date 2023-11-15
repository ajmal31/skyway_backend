//import all usecases  here
import ventureRegister from "../../../Application/usecase/venture/register.js"
import connectUser from "../../../Application/usecase/venture/connectUser.js"

const ventureController = (repositoryInterface, repositoryImplements, serviceInterface, ServiceImplements) => {

  //Repo interface and implements assign to a dbRepo
  const dbRepo = repositoryInterface(repositoryImplements())
  //service interface and implements assign to a service
  const service = serviceInterface(ServiceImplements())


  //POST METHODS

  const register=async(req,res)=>{

         const reponse=await ventureRegister(dbRepo,service,req.body)
  }

  const upload=async(req,res)=>{

    const uploadedFiles=req.files.map(file=>{
      return{
        orginalName:file.orginalName,
        location:file.location
      }
    })

    console.log('uploaded files',uploadedFiles)

    res.json({message:'image uploaded succesfulll',uploadedFiles})



  }
  const callRequested=async(req,res)=>{

       const uid=req.body.userId
       const vid=req.body.ventureId
       const response=await connectUser(dbRepo,uid,vid)
       if(!response) return res.json({message:'User Already requested this company'})
       return res.json({message:'You request send to the company ..they will contact you as soon as possible'})

       
  } 

  return {
    callRequested, 
    upload,
    register

  }





}

export default ventureController