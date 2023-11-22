import ventureReplicationSchema from "../models/allVentures"
import admin from "../models/admin-cred"
import user_replication from "../models/users"
const repositoryImplements = () => {

    const insertVentureData = async (data: Record<string, any>) => {
        const ventureReplicated = data
        const model = new ventureReplicationSchema({ ventureReplicated })
        const response = await model.save()
    }
    const findAdmin=async(email:string)=>{
 
        const response=await admin.findOne({email})
        return response

    }
    const findAllventures=async()=>{
        
        const response=await ventureReplicationSchema.find()
        
        return response
    }
    const insertUserData=async(data:Record<string,any>)=>{

       const user=new user_replication({data})
       const response=await user.save()

    }


    return {
        insertUserData,
        findAllventures,
        findAdmin,
        insertVentureData
    }


}

export default repositoryImplements