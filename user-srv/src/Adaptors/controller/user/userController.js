//import all usecases  here
import registerUser from "../../../Application/usecase/user/Register.js"
import userLogin from "../../../Application/usecase/user/Login.js"
import softDelete from "../../../Application/usecase/user/softDelete.js"
import findOneUser from "../../../Application/usecase/user/getUser.js"

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
        if(response.password&&response.userExist) return res.json({message:'user Logged in succesful',authToken:response.token})
        else if(response.userExist&&!response.password) return res.json({message:'please enter your valid password'})
        else return res.json({message:'user does not exist'})

    }



    //GET METHODS


    
    //SOFT DELETE
    const remove=async(req,res)=>{

       const userId=req.params.id
       const response=await softDelete(userId,dbRepository)
       if(response) res.json({message:'user deleted succeful'})


    }
    //GET PARTICULAR USER
    const getUser=async(req,res)=>{
        const userId=req.params.id
        const response=await findOneUser(userId,dbRepository)
        return response ? res.json({response}): res.json({message:"did'nt get user details"})
    }



    












    

    return{
        getUser,
        remove,
        register,
        login
    }

    



}

export default userController