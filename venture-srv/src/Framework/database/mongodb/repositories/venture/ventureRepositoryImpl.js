//import schemas here
import connectedUserModel from "../../models/venture-models/connected_users.js"
const ventureRepositoryImplements=()=>{
    
   // const connectedUser=async(uid,vid)=>{
   // try{

   //    const response_one =await connectedUserModel.findOne({ventureId:vid})
   //    if(response_one)
   //    let response_two=await connectedUserModel.find({ventureId:vid},{users:{$elemMatch:{userId:uid}}}) 
   //    if(!response_two) response_three=await connectedUserModel.updateOne({ventureId:vid},{$addToSet:{users:{userId:uid}}})

   // }catch(err){

   //    console.log('error occured while inserting userdata',err)
  // }

  const ventureExists=async(vid)=>{

       const response=await connectedUserModel.exists({ventureId:vid})
      
       return response

  }
  const userExists=async(uid,vid)=>{
    
    const response=await connectedUserModel.findOne({ventureId:vid,users:{$in:[uid]}})
   //  const response=await connectedUserModel.updateOne({ventureId:vid},{$addToSet:{users:{uid}}})
    return response
  }    
  const addUser=async(uid,vid)=>{

  const response=await connectedUserModel.updateOne({ventureId:vid},{$push:{users:uid}})
  return response

  }
  const addVentureWithUser=async(uid,vid)=>{

    const venture=new connectedUserModel({
       ventureId:vid,
       users:[uid]
    })
    const response=await venture.save()
    return response

  }
     
       
   

   return{
      addVentureWithUser,
      addUser,
      userExists,
      ventureExists

   }
}

export default ventureRepositoryImplements