const connectUser = async (dbrepo, data) => {


    const {ventureId,userData}=data
    userData.status='pending'


    let userAdded = false

    //if ventureid is exist dont need to create new document update the document id it not create new
    const ventureExists = await dbrepo?.ventureIdExist(ventureId)

    if(ventureExists){

        
       
        //already exist the venture so just added the user
        const response = await dbrepo.addUser(userData, ventureId)
        if (response) return console.log('user Added')
          consol.log("user not added something happend",response)
    } else {

        //The user and venture does'nt exist so creating new document with venture Id and user
        const response = await dbrepo.addVentureWithUser(userData, ventureId)
        if (response) return console.log('The first user added ')


    }



}

export default connectUser