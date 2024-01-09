const venturesCountByStatus=async(dbRepo,status)=>{

    const response=await dbRepo.ventureCountByStatus(status)
    return response


}

export default venturesCountByStatus