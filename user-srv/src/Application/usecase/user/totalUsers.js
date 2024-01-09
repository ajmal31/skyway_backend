const totalUsers=async(dbRepo)=>{

    const response=await dbRepo.totalUsers()
    return response


}

export default totalUsers