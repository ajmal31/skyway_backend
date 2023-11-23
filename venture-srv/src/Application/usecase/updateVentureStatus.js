import publisher from "../../message-broker/publisher/publisher.js"
const updateVentureStatus=async(data,dbrepo)=>{

    const response=await dbrepo.updateVentureStatus(data?.id)
    console.log('AFTER UPDATING THE VENTURE STATUS',response)
    await publisher('ADMIN-SRV',response)

}

export default updateVentureStatus