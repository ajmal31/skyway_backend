const getAllContries=async(dbRepo)=>{

    const response=await dbRepo.findCountries()
    return response


}

export default getAllContries