const userLogin=async(dbrepo,service,email,password)=>{

    const loginCredentials={
        key:'email',
        val:email
    }
    const user=await dbrepo.userExist(loginCredentials)

    const {_id,username}=user
     
    let response={
        userExist:false,
        password:null,
        token:null
    }
    if(!user) return response
    else {
          
        response.userExist=true
        const verifyPassword=await service.verifyPassword(user.password,password)
        if(verifyPassword){

            const token=await service.generateToken(_id,username)   
            response.password=true
            response.token=token
            
        }

        else response.password=false
        return response
    }
    

}

export default userLogin