//import all usecases  here
import ventureRegister from "../../../Application/usecase/venture/register.js"

const ventureController = (repositoryInterface, repositoryImplements, serviceInterface, ServiceImplements) => {

  //Repo interface and implements assign to a dbRepo
  const dbRepo = repositoryInterface(repositoryImplements())
  //service interface and implements assign to a service
  const service = serviceInterface(ServiceImplements())


  //POST METHODS

  const register=async(req,res)=>{

         const reponse=await ventureRegister(dbRepo,service,req.body)
  }

  return {
    register

  }





}

export default ventureController