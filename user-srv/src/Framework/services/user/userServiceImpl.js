
//import libraries if it is required
import argon2 from "argon2"
import jwt from 'jsonwebtoken'

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
    return {
        generateToken,
        verifyPassword,
        passwordHash
    }


}
export default userServiceImplements
