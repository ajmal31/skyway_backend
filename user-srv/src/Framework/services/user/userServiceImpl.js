
//import libraries if it is required
import argon2 from "argon2"
import jwt from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode"

const userServiceImplements=()=>{

    
    const passwordHash=async(password)=>{
      
        try{
            const hashed=await argon2.hash(password)
            return hashed

        }catch(err){
            
            console.log('error occured while hashinng password',hashed)

        }
        
       
    }
    const verifyPassword=async(dbPassword,password)=>{
         
        try{
            return argon2.verify(dbPassword,password)
        }catch(err){
            console.log('error occured while verfiying password')
        }
          
    }
    const generateToken=async(id,username)=>{

        const secret_key='ajmal123user-srv'

        const payload={
          userId:id,
          username:username
        }
        
       
        const token=jwt.sign(payload,secret_key)
        return token

    }
    const decode=async(data)=>{
        
        const decodedData=jwtDecode(data)
        return decodedData


    }
    return {
        decode,
        generateToken,
        verifyPassword,
        passwordHash
    }


}
export default userServiceImplements
