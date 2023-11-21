import ventureReplicationSchema from "../models/allVentures"
import admin from "../models/admin-cred"
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


    return {
        findAdmin,
        insertVentureData
    }


}

export default repositoryImplements