const createComment=async(dbRepo,data,uid)=>{

 let {vid,userName,content}=data
 const response =await dbRepo.createComment(content,vid,userName,uid)
 return response

}

export default createComment