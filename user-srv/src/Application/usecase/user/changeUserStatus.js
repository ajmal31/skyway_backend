const changeUserStatus=async(status,uid,vid,dbRep)=>{


    const response=await dbRep.changeUserStatus(status,uid,vid)
    return response
}

export default changeUserStatus