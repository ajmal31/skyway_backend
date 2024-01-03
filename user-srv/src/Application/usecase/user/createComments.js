const createComment=async(dbRepo,body,params)=>{
   
    const {userId}=params
    const {content}=body
    const response=await dbRepo.createComment(userId,content)
    return response


}

export default createComment