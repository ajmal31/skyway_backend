const phoneNumberVerified=async(dbRepo,userId)=>{

    //updating and finding key and values
    const obj={
        findKey:"_id",
        findVal:userId,
        key:"phone_verification",
        val:true
    }
    const response=await dbRepo.phoneNumberVerified(obj)
    console.log('rsponse in use case',response)
    return response


}
export default phoneNumberVerified