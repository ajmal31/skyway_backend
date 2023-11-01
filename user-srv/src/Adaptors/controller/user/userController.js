//import all usecases  here
import registerUser from "../../../Application/usecase/user/Register.js"
const userController=(repositoryInterface,repositoryImplements,serviceInterface,userServiceImplements)=>{
    
            //user repo and implements assign to dbRepository
            const dbRepository=repositoryInterface(repositoryImplements())
            //user service and implements assign service 
            const service=serviceInterface(userServiceImplements())

    const register=async(req,res)=>{

        const response=await registerUser(dbRepository,service,req.body)
        console.log('response in controller ',response)
         if(!response.message){
            console.log('user created case');
            res.json({response}).status(200)

         } 
         else {
            console.log('user exist case')
            res.json({message:response.message}).status(403)
         }
    }

    return{
        register
    }

    



}

export default userController