const userRepositoryInterface=(repositories)=>{

     const emailExist=(obj)=>repositories.findUser(obj)
     const phoneExist=(obj)=>repositories.findUser(obj)
     const register=(data)=> repositories.register(data)
     const userExist=(data)=>repositories.findUser(data)
     const remove=(userId)=>repositories.remove(userId)
     const getUser=(obj)=>repositories.findUser(obj)
     const update=(data,uid)=>repositories.update(data,uid)
     const findUser=(obj)=>repositories.findUser(obj)
     const ventureExist=(uid,vid)=>repositories.ventureExist(uid,vid)
     const addVentureToUser=(uid,vid)=>repositories.addVentureToUser(uid,vid)
       
     

    return {
        addVentureToUser,
        ventureExist,
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