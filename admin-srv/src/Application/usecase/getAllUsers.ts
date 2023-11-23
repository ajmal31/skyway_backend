const allUsers=async(dbRepo:any)=>{

    const response=await dbRepo.getAllUsers()   
    return response

 

}

export default allUsers