const takeAllUsers=async(dbRepo,vid)=>{


    const response= await dbRepo.getAllUsers(vid)
    const {users}=response
    return users

}

export default takeAllUsers