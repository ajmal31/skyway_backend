import publisher from "../../../Message-broker/publisher/publisher.js"
const connectUser = async (dbrepo, uid, vid) => {

    const obj={
        key:'_id',
        val:uid,
    }
    const foreignQueue='VENTURE_SRV'
    
    const message1='You Already Requested This venture. please wait for their response'
    const message2='user Request Successfull'
    const message3='user Request didnt completed something happend try once more'
    const message4="Please verify your number"
    //is verified phone number
    const isVerfied=await dbrepo.findUser(obj)
    if(!isVerfied?.phone_verification) return message4

    //when user requesting add user db to ventureId
    //chechkventure Already exist or not
 
    const ventureExist=await dbrepo.ventureExist(uid,vid)

    if(ventureExist) return message1

   //it new company the user perspective ..so adding venture id to users collection
    const addVentureToUser=await dbrepo.addVentureToUser(uid,vid)
        
     //finding particular user
    //  const userData=await dbrepo.findUser(obj)
     const {_id,username,email,phone,region,destination,date_of_birth}=isVerfied
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