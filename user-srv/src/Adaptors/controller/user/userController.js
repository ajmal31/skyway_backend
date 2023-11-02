//import all usecases  here
import registerUser from "../../../Application/usecase/user/Register.js"
import userLogin from "../../../Application/usecase/user/Login.js"
const userController=(repositoryInterface,repositoryImplements,serviceInterface,userServiceImplements)=>{
    
            //user repo and implements assign to dbRepository
            const dbRepository=repositoryInterface(repositoryImplements())
            //user service and implements assign service 
            const service=serviceInterface(userServiceImplements())

    //POST METHODS
    
    //USER REGISTER
    const register=async(req,res)=>{

        const response=await registerUser(dbRepository,service,req.body)
       
         if(!response.message)res.json({response}).status(200)
         else res.json({message:response.message}).status(403)
         
    }
    // USER LOGIN
    const login=async(req,res)=>{

        
        let {email,password}=req.body
         
        const response=await userLogin(dbRepository,service,email,password)
        if(response.password&&response.userExist) return res.json({message:'user Logged in succesful'})
        else if(response.userExist&&!response.password) return res.json({message:'please enter you valid password'})
        else return res.json({message:'user does not exist'})

    }
















    

    return{
        register,
        login
    }

    



}

export default userController