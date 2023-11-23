const getAllVentures=async(dbRepo:any)=>{

    const response=await dbRepo.ventureList()
    return response


}

export default getAllVentures