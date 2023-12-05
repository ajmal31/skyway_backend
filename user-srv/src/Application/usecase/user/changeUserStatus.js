const changeUserStatus=async(status,uid,vid,dbRep)=>{


    const response=await dbRep.changeUserStatus(status,uid,vid)
    
}

export default changeUserStatus