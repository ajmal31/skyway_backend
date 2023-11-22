const userHandler=async(dbRepo:any,data:Record<string,any>)=>{


   const response=await dbRepo.userHandler(data)

}

export default userHandler