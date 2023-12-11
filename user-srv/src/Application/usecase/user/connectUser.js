import publisher from "../../../Message-broker/publisher/publisher.js"
const connectUser = async (dbrepo, uid, vid) => {

    const obj={
        key:'_id',
        val:uid
    }
    const foreignQueue='VENTURE_SRV'
    
    const message1='You Already Requested This venture. please wait for their response'
    const message2='user Request Successfull'
    const message3='user Request didnt completed something happend try once more'

    //when user requesting add user db to ventureId
    //chech venture Already exist or not
    console.log('ventureId',vid)
    const ventureExist=await dbrepo.ventureExist(uid,vid)
    console.log('venture exist???????????',ventureExist)
    if(ventureExist) return message1

   //it new company the user perspective ..so adding venture id to users collection
    const addVentureToUser=await dbrepo.addVentureToUser(uid,vid)
        
     //finding particular user
     const userData=await dbrepo.findUser(obj)
     const {_id,username,email,phone,region,destination,date_of_birth}=userData
     //filter neccessory data's only from user document for 
     const data={
          userId:_id,
          username,
          email,
          phone,
          region,
          destination,
          date_of_birth
     }
    
     //SENDING DATA TO FOREIGN QUEUEUE
    const payload={
        userData:data,
        ventureId:vid,
        method:'call request'
    }
    //Publishing Data 
    const response= await publisher(foreignQueue,payload)
    if(response) return message2
    else return message3



}

export default connectUser