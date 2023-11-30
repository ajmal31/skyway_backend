const getAllUsers=async(dbRepo)=>{


    const response=await dbRepo.getAllUsers()
    return response
}

export default getAllUsers