// import publisher from "../../../message-broker/publisher/publisher.js"
const updateVentureStatus=async(dbrepo,data)=>{

    const response=await dbrepo.updateVentureStatus(data?.id,data?.status)
   return response
    
    // await publisher('ADMIN-SRV',response)

}

export default updateVentureStatus