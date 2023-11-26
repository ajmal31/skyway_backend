const takeOneVenture=async(dbRepo,vid)=>{

    const obj={
        key:"_id",
        value:vid
    }

    const response=await dbRepo.getOneVenture(obj)
    return response


}

export default takeOneVenture