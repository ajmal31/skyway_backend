const getAllComments=async(dbRepo)=>{

    const response=await dbRepo.getAllComments()
    return response

}

export default getAllComments