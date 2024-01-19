const connectUser = async (dbrepo,vid) => {

    let count=1
    let key="connections_count"
    const response=await dbrepo.updateVentureConnectionsCount(vid,count,key)
    console.log("incremented connections ",response)
    return 

    // const {ventureId,userData}=data
    // userData.status='pending'


    // let userAdded = false

    // //if ventureid is exist dont need to create new document update the document id it not create new
    // const ventureExists = await dbrepo?.ventureIdExist(ventureId)

    // if(ventureExists){

        
       
    //     //already exist the venture so just added the user
    //     const response = await dbrepo.addUser(userData, ventureId)
    //     if (response) return console.log('user Added')
    //       consol.log("user not added something happend",response)
    // } else {

    //     //The user and venture does'nt exist so creating new document with venture Id and user
    //     const response = await dbrepo.addVentureWithUser(userData, ventureId)
    //     if (response) return console.log('The first user added ')


    // }



}

export default connectUser