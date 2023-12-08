import publisher from "../../../Message-broker/publisher/publisher.js"
const getUserUpdateChat=async(uid,dbRepo)=>{

    const obj={
        key:"_id",
        val:uid
    }
    const response=await dbRepo.findUser(obj)
    const foreign='CHAT-SRV'
    const publish=await publisher(foreign,response)
    return publish

    

}

export default getUserUpdateChat