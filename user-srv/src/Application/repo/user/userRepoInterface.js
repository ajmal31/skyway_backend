const userRepositoryInterface=(repositories)=>{

     const emailExist=(obj)=>repositories.findUser(obj)
     const phoneExist=(obj)=>repositories.findUser(obj)
     const register=(data)=> repositories.register(data)
       
     

    return {
        emailExist,
        phoneExist,
        register
                
    }
}

export default userRepositoryInterface