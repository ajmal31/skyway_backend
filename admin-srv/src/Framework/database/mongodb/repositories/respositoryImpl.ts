import ventureReplicationSchema from "../models/allVentures"
import admin from "../models/admin-cred"
import user_replication from "../models/users"
import { wallet } from "../models/wallet"
const repositoryImplements = () => {

    const insertVentureData = async (data: Record<string, any>) => {

       
        const model = await ventureReplicationSchema.findOneAndUpdate({ "ventureReplicated._id": data?._id },
            { $set: { ventureReplicated: data } }, { upsert: true })
       
        return model

    }
    const findAdmin = async (email: string) => {

        const response = await admin.findOne({ email })
        return response

    }
    const findAllventures = async () => {

        const response = await ventureReplicationSchema.find()

        return response
    }
    const insertUserData = async (data: Record<string, any>) => {

        const response= await user_replication.updateOne({"data._id":data._id},{$set:{data}},{upsert:true})

    }
    const getWalletAmount=async()=>{
              
        const response=await wallet.find()

    }

    return {

        insertUserData,
        findAllventures,
        findAdmin,
        insertVentureData
    }


}

export default repositoryImplements