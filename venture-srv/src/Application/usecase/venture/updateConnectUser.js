const updateConnectUser=async(dbRepo,data)=>{

    const response=await dbRepo.updateConnectUser(data?.data)


}

export default updateConnectUser