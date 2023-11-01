//import entities if it need
import userData from "../../../Entities/user/userEntities.js"
const registerUser=async(dbrepo,service,body)=>{
       


      const {username,email,region,phone,destination,date_of_birth,password,confirm_password}=body
      const emailObj={
        key:'email',
        val:email
      }
      const phoneObj={
        key:'phone',
        val:phone
      }
      const emailExist= await dbrepo.emailExist(emailObj)
      const phoneExist= await dbrepo.phoneExist(phoneObj)
      

      if(emailExist) return {message:"email already used"}
      else if(phoneExist) return {message:"phone number already used"}
      else{
           //handle password and confirm password is Match
            let HashPassword=await service.passwordHashing(password)
            
            console.log('before sending password and confirm password')
            console.log(password)
            console.log(confirm_password)
            const userDetails= await userData(username,email,region,phone,destination,date_of_birth,HashPassword,HashPassword)
            const response=await dbrepo.register(userDetails)
            return response



    }


}

export default registerUser