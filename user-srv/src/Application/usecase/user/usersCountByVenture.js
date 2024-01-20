const usersCountByVenture=async(dbRepo,vid)=>{

      
        const response=await dbRepo.usersCountByVenture(vid)
        return response
    
}

export default usersCountByVenture