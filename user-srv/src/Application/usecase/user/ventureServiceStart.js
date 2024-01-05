const ventureService=async(dbRepo,vid,uid)=>{


     const response=await dbRepo.ventureServiceStart(vid,uid)
     return response

}

export default ventureService