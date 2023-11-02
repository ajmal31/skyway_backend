//import all usecases  here
import registerUser from "../../../Application/usecase/user/Register.js"
const userController=(repositoryInterface,repositoryImplements,serviceInterface,userServiceImplements)=>{
    
            //user repo and implements assign to dbRepository
            const dbRepository=repositoryInterface(repositoryImplements())
            //user service and implements assign service 
            const service=serviceInterface(userServiceImplements())

    //POST METHODS
    
    //user Register
    const register=async(req,res)=>{

        const response=await registerUser(dbRepository,service,req.body)
       
         if(!response.message)res.json({response}).status(200)
         else res.json({message:response.message}).status(403)
         
    }
















    

    return{
        register
    }

    



}

export default userController