
//import libraries if it is required
import argon2 from "argon2"
const userServiceImplements=()=>{

    
    const passwordHash=async(password)=>{

        const hashed=await argon2.hash(password)
        return hashed
       
    }
    return {
        passwordHash
    }


}
export default userServiceImplements
