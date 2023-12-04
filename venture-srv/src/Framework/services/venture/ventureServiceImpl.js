
//import libraries if it is required 
import argon2 from "argon2"
import  jwt  from "jsonwebtoken"
import env from "../../../config/env.js"
const ventureServiceImplements=()=>{

    //Password Hashing 
    const passwordHash=async(pass1,pass2)=>{
 
        const password_one=await argon2.hash(pass1)
        const password_two=await argon2.hash(pass2)
        return {password_one,password_two}

    }
    //Hashed Password Verifying
    const verifyPassword=async(dbpass_one,pass_one,dbpass_two,pass_two)=>{


        const password_one=await argon2.verify(dbpass_one,pass_one)
        const password_two=await argon2.verify(dbpass_two,pass_two)
        return {password_one,password_two}
    }
    //Jwt Token Generating
    const generateToken=async(ventureData)=>{
     
      const token=jwt.sign(ventureData,env.JWT_SECRETKEY)
     
      return token
          
    }

    return{
        generateToken,
        verifyPassword,
        passwordHash

    }

}
export default ventureServiceImplements
