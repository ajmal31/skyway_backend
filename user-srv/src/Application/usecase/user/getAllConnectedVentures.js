const getAllConnectedVentures = async (dbRepo, userId) => {

    const userObj = {
        key: '_id',
        val: userId
    }
    // find users ✅
    const user = await dbRepo.findUser(userObj)
    if (!user) return console.log('user does not exist')

    //select ventures List ✅
    let { ventures } = user
    if (ventures.length < 1) return console.log("user does'nt Request any Ventures,No Venture Found")
    const ventureIds = []
    //filter out allowed ventures and take Id's✅
    for (let i = 0; i < ventures.length; i++) {

        let value = Object.values(ventures[i])

        if (value[1] === "allowed") ventureIds.push(value[0])
    }
    if (ventureIds.length < 1) return console.log('no Ids Allowed ventures Found')
    //take venture using id from connected ventures collection✅
    console.log('ventureIds',ventureIds)
    const response = await dbRepo.getAllConnectedVentures(ventureIds)
    return response




}

export default getAllConnectedVentures