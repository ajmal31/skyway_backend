const connectUser = async (dbrepo, uid, vid) => {

    let userAdded = false

    const ventureExists = await dbrepo.ventureExist(vid)

    if(ventureExists){

        const userExist = await dbrepo.userExist(uid, vid)

        if (userExist) {
 
            return userAdded

        }
        const response = await dbrepo.addUser(uid, vid)
        if (response) return userAdded=true
          consol.log("user not added something happend",response)
    } else {


        const response = await dbrepo.addVentureWithUser(uid, vid)
        if (response) return userAdded=true


    }



}

export default connectUser