const takeAllConnectedUsers=async(dbRepo,vid)=>{

    const allConnectedUsers=await dbRepo.getAllConnectedUsers(vid)
    return allConnectedUsers


}

export default takeAllConnectedUsers