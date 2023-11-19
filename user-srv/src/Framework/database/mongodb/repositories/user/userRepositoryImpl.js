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
    
    const update=async(userdata)=>{
        
        const obj={
            username:userdata?.getUsername(),
            email:userdata?.getEmail(),
            region:userdata?.getRegion(),
            phone:userdata?.getPhone(),
            destination:userdata?.getDestination(),
           
        }
        const {username,email,region,phone,destination}=obj
        const response=await userModel.findOneAndUpdate({email:email},
        {$set:{username:username,email:email,region:region,phone:phone,destination:destination}},
        {returnOriginal:false}) 
        return response

    }
    const ventureExist=async(uid,vid)=>{

        const response=await userModel.findOne({_id:uid,ventures:{$elemMatch:{ventureId:vid}}})
        return response
    }
    const addVentureToUser=async(uid,vid)=>{

        const response=await userModel.updateOne({_id:uid},{$push:{ventures:{ventureId:vid,status:'pending'}}})
        return response
    }
    return{
        addVentureToUser,
        ventureExist,
        update,
        remove,
        register,
        findUser
    }

}

export default userRepositoryImplements