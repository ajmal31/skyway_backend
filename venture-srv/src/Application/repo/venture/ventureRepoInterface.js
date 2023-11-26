const ventureRepositoryInterface=(repositories)=>{

     const ventureIdExist=(vid)=>repositories.ventureIdExist(vid)
     const userExist=(uid,vid)=>repositories.userExists(uid,vid)
     const addUser=(uid,vid)=>repositories.addUser(uid,vid)
     const addVentureWithUser=(uid,vid)=>repositories.addVentureWithUser(uid,vid)
     const register=(data)=>repositories.register(data)
     const ventureNameExist=(obj)=>repositories.ventureExist(obj)
     const emailExist=(obj)=>repositories.ventureExist(obj)
     const registerNumberExist=(obj)=>repositories.ventureExist(obj)
     const licenseNumberExist=(obj)=>repositories.ventureExist(obj)
     const getAllVentures=(obj)=>repositories.getAllVentures(obj)
     const updateVentureStatus=(id)=>repositories.updateVentureStatus(id)
     const getAllUsers=(vid)=>repositories.getAllUsers(vid)
     const getOneVenture=(obj)=>repositories.ventureExist(obj)


     

    return {
        getOneVenture,
        getAllUsers,
        updateVentureStatus,
        getAllVentures,
        ventureNameExist,
        emailExist,
        registerNumberExist,
        licenseNumberExist,
        register,
        addVentureWithUser,
        addUser,
        userExist,
        ventureIdExist
       
    }
}

export default ventureRepositoryInterface