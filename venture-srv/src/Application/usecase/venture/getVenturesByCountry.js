const getVenturesByCountry=async(dbRepo,type,country)=>{


    const response=await dbRepo.getVenturesByCountry(type,country)
    return response


}

export default getVenturesByCountry