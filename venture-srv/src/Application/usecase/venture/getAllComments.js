const getAllComments=async(dbRepo,vid)=>{

   const response=await dbRepo.getAllComments(vid)
   return response

}

export default getAllComments