const userLogin=async(dbrepo,service,email,password)=>{

    const loginCredentials={
        key:'email',
        val:email
    }
    const user=await dbrepo?.userExist(loginCredentials)
    
    let response={
        userExist:false,
        password:null,
        token:null,
        username:null
    }

      const createToken=async(_id,username)=>{

        return await service?.generateToken(_id,username)

      }
    //if user not exist return
    if(!user) return response

        //destructuring id and username for passing arguments
        const {_id,username}=user
      
        response.userExist=true
        const verifyPassword=await service.verifyPassword(user.password,password)
        if(verifyPassword){

            const token=await createToken(_id,username)   
            response.password=true
            response.token=token
            response.username=username
            
        }

        else response.password=false
        return response
    
    

}

export default userLogin