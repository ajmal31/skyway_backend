

const findOneUser=async(userId,dbRepo)=>{

    const obj={
        key:'_id',
        val:userId
    }
    const response=await dbRepo.getUser(obj) 
    if(response) return response
    else return {status:false}


}

export default findOneUser