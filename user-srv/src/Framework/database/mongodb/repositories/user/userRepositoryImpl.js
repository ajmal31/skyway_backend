//import schemas here
import { userModel } from "../../models/user-models/userSchema.js"
const userRepositoryImplements=()=>{
  

    const findUser=async(obj)=>{
  
        const {key,val}=obj
        const query={[key]:val}
        const response=await userModel.findOne(query)
        return response


    }
    const register=async(userdata)=>{

        const user=new userModel({
           username:userdata?.getUsername(),
           email:userdata?.getEmail(),
           region:userdata?.getRegion(),
           phone:userdata?.getPhone(),
           destination:userdata?.getDestination(),
           date_of_birth:userdata?.getDate_of_birth(),
           password:userdata?.getPassword(),
           confirm_password:userdata?.getConfirm_password(),
           

        })
       
        try{
            let response=await user.save()
            return response

        }catch(err){
            
            console.log('error occured while inserting userdata')
            console.log(err)
            
        }
        
    }
    const remove=async(userId)=>{

        const response=await userModel.updateOne({_id:userId},{$set:{soft_delete:true}})
        return response

    }
    
    return{
        remove,
        register,
        findUser
    }

}

export default userRepositoryImplements