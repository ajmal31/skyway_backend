const googleWithLogin=async(dbRepo,service,data)=>{

    //data decoding
    const decodedData=await service.decode(data)
    
    console.log('decoded data',decodedData)
    const {email}=decodedData
    const obj={
        key:'email',
        val:email
    }

    const user=await dbRepo.userExist(obj)
    //checkgin whether user exist or not if it's not return null (user variable value) 
    //otherwise move on other function like token generating
    if(!user) return user
    else {

        const {_id,username}=user
        const token=await service.generateToken(_id,username)
        return token
    }
}

export default googleWithLogin