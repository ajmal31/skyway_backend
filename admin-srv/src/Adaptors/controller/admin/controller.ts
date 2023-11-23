import { Request,Response } from "express"
import loginUsecase from "../../../Application/usecase/login"
import allVentureList from "../../../Application/usecase/getAllVenturs"
import allUsers from "../../../Application/usecase/getAllUsers"
const adminController=(dbrepInterface:any,dbRepoImplements:any,serviceInterface:any,serviceImplements:any)=>{


    const dbRepo=dbrepInterface(dbRepoImplements())
    const service=serviceInterface(serviceImplements())

    //POST METHODS
    const login=async(req:Request,res:Response)=>{
          
        const response=await loginUsecase(dbRepo,service,req.body)
        return res.json(response)
        
    }
    //GET METHODS

    const getAllventures=async(req:Request,res:Response)=>{

        const response=await allVentureList(dbRepo)
        return res.json(response)
    }
    const getAllUsers=async(req:Request,res:Response)=>{


    const response=await allUsers(dbRepo)
    return res.json(response)

    }

    return {
        getAllUsers,
        getAllventures,
        login
       
    }   
}


export default adminController