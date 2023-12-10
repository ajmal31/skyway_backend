const takeAllGenuineUsers=async(dbRepo,vid)=>{

    const response=await dbRepo.getAllGenuineUsers(vid)
    return response


}

export default takeAllGenuineUsers