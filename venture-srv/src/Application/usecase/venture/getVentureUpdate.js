import publisher from "../../../message-broker/publisher/publisher.js"
const getVentureUpdateChat = async (vid, dbRepo) => {
     
    //mongo query cred
    const obj = {
        key: "_id",
        value: vid
    }
    const response = await dbRepo.getOneVenture(obj)
    if(!response)return false
    const foreign="CHAT-SRV"
    const publish=await publisher(foreign,response)
    return publish

}

export default getVentureUpdateChat