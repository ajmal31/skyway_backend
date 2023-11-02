
//import libraries if it is required
import argon2 from "argon2"
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
    return {
        verifyPassword,
        passwordHash
    }


}
export default userServiceImplements
