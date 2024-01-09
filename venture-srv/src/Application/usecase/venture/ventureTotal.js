const totalVentures=async(dbRepo)=>{

 const response=await dbRepo.totalVentures()
 return response

}

export default totalVentures