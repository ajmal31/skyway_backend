//import entities if it need
import userData from "../../../Entities/user/userEntities.js"
import publisher from "../../../Message-broker/publisher/publisher.js"
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
            

            const userDetails= await userData(username,email,region,phone,destination,date_of_birth,HashPassword,HashPassword)
            const response=await dbrepo.register(userDetails)
            // const foreign='ADMIN-SRV'
            // const result=await publisher(foreign,response)

            return response



    }


}

export default registerUser