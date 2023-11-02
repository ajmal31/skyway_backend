const login=async(dbrepo,service,email,password)=>{

    const loginCredentials={
        key:'email',
        val:email
    }
    const user=await dbrepo.userExist(loginCredentials)
     
    let notExist=true
    if(!user) return userExist 
    else {

        const verifyPassword=await service.verifyPassword(user.password,password)
        return verifyPassword
    }
    

}

export default login