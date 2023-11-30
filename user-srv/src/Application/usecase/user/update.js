import publisher from "../../../Message-broker/publisher/publisher.js"
import userData from "../../../Entities/user/userEntities.js"

const updateUSer = async (userdata, dbRepo, service) => {

    const { username, email, region, phone, destination, Date_of_birth, password, confirm_password, _id } = userdata

    const userDetails = await userData(username, email, region, phone, destination, Date_of_birth, password, confirm_password)

    const response = await dbRepo.update(userDetails, _id)
    //publish message to venture side 

    const payload = {
        method: "update connect user",
        data: response
    }
    if(response?.ventures){

     const venturePuslisher = await publisher('VENTURE_SRV', payload)
     console.log('venture publis', venturePuslisher )
    }

   
    const adminPublisher = await publisher("ADMIN-SRV", response)
    
    console.log('admin publish', adminPublisher)

    return response




}

export default updateUSer