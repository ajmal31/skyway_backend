const connectUser = async (dbrepo, uid, vid) => {

    let userAdded = false

    const ventureExists = await dbrepo?.ventureIdExist(vid)

    if(ventureExists){

        const userExist = await dbrepo?.userExist(uid, vid)

        if (userExist) {
            console.log('user already exists')
            return userAdded

        }
        console.log('user does not exist')
        //already exist the venture so just added the user
        const response = await dbrepo.addUser(uid, vid)
        if (response) return userAdded=true
          consol.log("user not added something happend",response)
    } else {

        //The user and venture does'nt exist so creating new document with venture Id and user
        const response = await dbrepo.addVentureWithUser(uid, vid)
        if (response) return userAdded=true


    }



}

export default connectUser