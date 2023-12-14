import publisher from "../../../Message-broker/publisher/publisher.js"
import userData from "../../../Entities/user/userEntities.js"

const updateUSer = async (userdata, dbRepo, service) => {

    const { username, email, region, phone, destination, Date_of_birth, password, confirm_password, _id } = userdata
    
    //check updating email is already registered or not
    const email_obj={
        key:"email",
        val:email,
        neVal:_id,
    }
    const phone_obj={
        key:"phone",
        val:phone,
        neVal:_id
    }
    
    const emailExist=await dbRepo.findUser(email_obj)
    if(emailExist) return{message:"Email is already used"}
    const phoneExist=await dbRepo.findUser(phone_obj)
    if(phoneExist) return{message:"Phone Number is already used"}
    const phone_update={
        findKey:"_id",
        findVal:_id,
        key:"phone_verification",
        val:false
    }
    const findUser_obj={
        key:"_id",
        val:_id
    }
    //if the phone is same dont'change phone number verification value
    const findUser=await dbRepo.findUser(findUser_obj)
    if(findUser?.phone!==phone)
    await dbRepo.phoneNumberRejected(phone_update)

    const userDetails = await userData(username, email, region, phone, destination, Date_of_birth, password, confirm_password)
    
   
    const response = await dbRepo.update(userDetails, _id)
    //publish message to venture side 

    const payload = {
        method: "update connect user",
        data: response
    }
    if(response?.ventures){

     const venturePuslisher = await publisher('VENTURE_SRV', payload)
    }

   
    const adminPublisher = await publisher("ADMIN-SRV", response)
    
    console.log('admin publish', adminPublisher)

    return response




}

export default updateUSer