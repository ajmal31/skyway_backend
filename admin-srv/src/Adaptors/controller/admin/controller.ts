import { Request,Response } from "express"
const adminController=(dbrepInterface:any,dbRepoImplements:any,serviceInterface:any,serviceImplements:any)=>{


    const dbRepo=dbrepInterface(dbRepoImplements())
    const service=serviceInterface(serviceImplements())

    console.log('reach in controller')
    const test=(req:Request,res:Response)=>{
        return console.log('helo test router')
    }

    return {
        test
    }   
}

export default adminController