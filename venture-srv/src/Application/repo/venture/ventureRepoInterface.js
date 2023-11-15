const ventureRepositoryInterface=(repositories)=>{

     const ventureExist=(vid)=>repositories.ventureExists(vid)
     const userExist=(uid,vid)=>repositories.userExists(uid,vid)
     const addUser=(uid,vid)=>repositories.addUser(uid,vid)
     const addVentureWithUser=(uid,vid)=>repositories.addVentureWithUser(uid,vid)


     

    return {
        addVentureWithUser,
        addUser,
        userExist,
        ventureExist
       
    }
}

export default ventureRepositoryInterface