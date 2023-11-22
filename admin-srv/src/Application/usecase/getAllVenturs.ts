const getAllVentures=async(dbRepo:any)=>{

    const response=await dbRepo.ventureList()
    console.log('List of ventures',response)


}

export default getAllVentures