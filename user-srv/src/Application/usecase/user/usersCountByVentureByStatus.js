const usersCountByVentureByStatus=async(dbRepo,vid,status)=>{

    const response=await dbRepo.usersCountByVentureByStatus(vid,status)
    return response

}

export default usersCountByVentureByStatus