const userRepositoryInterface=(repositories)=>{

     const emailExist=(obj)=>repositories.findUser(obj)
     const phoneExist=(obj)=>repositories.findUser(obj)
     const register=(data)=> repositories.register(data)
     const userExist=(data)=>repositories.findUser(data)
     const remove=(userId)=>repositories.remove(userId)
     const getUser=(obj)=>repositories.findUser(obj)
     const update=(data)=>repositories.update(data)
     const findUser=(obj)=>repositories.findUser(obj)
       
     

    return {
        findUser,
        update,
        getUser,
        remove,
        userExist,
        emailExist,
        phoneExist,
        register
                
    }
}

export default userRepositoryInterface