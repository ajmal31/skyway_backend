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
     const getAllUsers=()=>repositories.getAllUsers()
     const getAllConnectedUsers=(vid)=>repositories.getAllConnectedUsers(vid)
     const changeUserStatus=(status,uid,vid)=>repositories.changeUserStatus(status,uid,vid)  
     const findConnectedVenture=(id)=>repositories.findConnectedVenture(id)
     const createConnectedVentures=(data)=>repositories.createConnectedVentures(data)
     const getConnectedVenture=(receiverId,ventureId)=>repositories.getConnectedVenture(receiverId,ventureId)
     const getAllConnectedVentures=(ids)=>repositories.getAllConnectedVentures(ids)
     const getAllGenuineUsers=(vid)=>repositories.getAllGenuineUsers(vid)
     const phoneNumberVerified=(obj)=>repositories.updateUserField(obj)
     const phoneNumberRejected=(obj)=>repositories.updateUserField(obj)
     const otpFailed=(uid)=>repositories.otpFailed(uid)
     const documentUploading=(documents,uid)=>repositories.documentUploading(documents,uid)
     const getVentureRelatedUsersCount=(vid,status)=>repositories.getVentureRelatedUsers(vid,status)
     const getAllConnectedUsersCount=(vid)=>repositories.getAllConnectedUsersCount(vid)
     

    return {
        getAllConnectedUsersCount,
        getVentureRelatedUsersCount,
        documentUploading,
        otpFailed,
        phoneNumberRejected,
        phoneNumberVerified,
        getAllGenuineUsers,
        getAllConnectedVentures,
        getConnectedVenture,
        createConnectedVentures,
        findConnectedVenture,
        changeUserStatus,
        getAllConnectedUsers,
        getAllUsers,
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