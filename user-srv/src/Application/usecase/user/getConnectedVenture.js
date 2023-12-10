const getConnectedVenture=async(dbRepo,senderId,receiverId)=>{

    const response=await dbRepo.getConnectedVenture(senderId,receiverId)
    console.log('got particular venture',response)
    return response

}

export default getConnectedVenture