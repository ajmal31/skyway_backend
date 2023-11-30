// import publisher from "../../../message-broker/publisher/publisher.js"
const updateVentureStatus=async(dbrepo,data)=>{

    const response=await dbrepo.updateVentureStatus(data?.id)
   if(response) return {statusChanged:true}
    
    // await publisher('ADMIN-SRV',response)

}

export default updateVentureStatus