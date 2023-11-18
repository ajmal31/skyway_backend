import publisher from "../../../Message-broker/publisher/publisher.js"
const connectUser = async (dbrepo, uid, vid) => {

    const obj={
        key:'_id',
        val:uid
    }
    const foreignQueue='VENTURE_SRV'
    const userData=await dbrepo.findUser(obj)

    //SENDING DATA TO FOREIGN QUEUEUE
    const data={
        userData:userData,
        ventureId:vid,
        method:'call request'
    }
    
    const response= await publisher(foreignQueue,data)
    
    console.log(response)


}

export default connectUser