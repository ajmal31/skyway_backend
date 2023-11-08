import userData from "../../../Entities/user/userEntities"

const update=async(userdata,dbRepo,service)=>{

    const userDetails=await userData(userdata)

    const response=await dbRepo.update(userDetails)




}

export default update