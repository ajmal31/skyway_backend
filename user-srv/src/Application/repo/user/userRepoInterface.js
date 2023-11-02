const userRepositoryInterface=(repositories)=>{

     const emailExist=(obj)=>repositories.findUser(obj)
     const phoneExist=(obj)=>repositories.findUser(obj)
     const register=(data)=> repositories.register(data)
     const userExist=(data)=>repositories.findUser(data)
       
     

    return {
        userExist,
        emailExist,
        phoneExist,
        register
                
    }
}

export default userRepositoryInterface