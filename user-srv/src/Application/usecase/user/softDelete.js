const softDelete=async(userId,dbRepo)=>{

    const response=await dbRepo.remove(userId)
    return response



}
export default softDelete