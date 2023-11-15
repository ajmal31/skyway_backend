
//import libraries if it is required 
import argon2 from "argon2"
const ventureServiceImplements=()=>{

    const passwordHash=async(pass1,pass2)=>{
 
        const password_one=await argon2.hash(pass1)
        const password_two=await argon2.hash(pass2)
        return {password_one,password_two}

    }

    return{
        passwordHash

    }

}
export default ventureServiceImplements
