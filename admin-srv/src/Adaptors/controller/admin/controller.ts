import { Request,Response } from "express"
import loginUsecase from "../../../Application/usecase/login"
import allVentureList from "../../../Application/usecase/getAllVenturs"
import takeWalletAmount from "../../../Application/usecase/wallet"
const adminController=(dbrepInterface:any,dbRepoImplements:any,serviceInterface:any,serviceImplements:any)=>{


    const dbRepo=dbrepInterface(dbRepoImplements())
    const service=serviceInterface(serviceImplements())

    //POST METHODS
    const login=async(req:Request,res:Response)=>{
          
        const response=await loginUsecase(dbRepo,service,req.body)
        console.log("login response",response)
        return res.json(response)
        
    }
    //GET METHODS

    const getAllventures=async(req:Request,res:Response)=>{

        const response=await allVentureList(dbRepo)
        return res.json(response)
    }
    const getWalletAmount=async(req:Request,res:Response)=>{


        const response=await takeWalletAmount(dbRepo)
    }



    return {
        getWalletAmount,
        getAllventures,
        login
       
    }   
}


export default adminController