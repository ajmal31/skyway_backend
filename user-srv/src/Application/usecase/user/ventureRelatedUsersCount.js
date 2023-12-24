const ventureRelatedUsersCount=async(dbRepo,vid,status)=>{

    const count=await dbRepo.getVentureRelatedUsersCount(vid,status)
    return count


}

export default ventureRelatedUsersCount