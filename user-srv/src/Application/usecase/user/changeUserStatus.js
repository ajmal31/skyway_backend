import publisher from "../../../Message-broker/publisher/publisher.js"
const changeUserStatus=async(status,uid,vid,dbRep)=>{


    const response=await dbRep.changeUserStatus(status,uid,vid)
    console.log('reponse after chagin user status ',response)
    const foreign="VENTURE_SRV"
    const payload={
        method:'taking venture data',
        vid:vid
    }
    let k=publisher(foreign,payload)
    console.log("published to venture srv to take user venture in user service",k)
    return response
}

export default changeUserStatus