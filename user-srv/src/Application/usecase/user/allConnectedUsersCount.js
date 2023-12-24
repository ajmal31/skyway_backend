const getAllConnectedUsersCount=async(dbRepo,vid)=>{

    const count=await dbRepo.getAllConnectedUsersCount(vid)
    return count


}

export default getAllConnectedUsersCount