const userLogin=async(dbrepo,service,email,password)=>{

    const loginCredentials={
        key:'email',
        val:email
    }
    const user=await dbrepo.userExist(loginCredentials)
     
    let response={
        userExist:false,
        password:null
    }
    if(!user) return response
    else {
          
        response.userExist=true
        const verifyPassword=await service.verifyPassword(user.password,password)
        if(verifyPassword)
        response.password=true
        else response.password=false
        return response
    }
    

}

export default userLogin