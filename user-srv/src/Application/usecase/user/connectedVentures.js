const connectedVentures=async(dbRepo,data)=>{

    console.log('db repo',dbRepo)
     const ventureExist=await dbRepo.findConnectedVenture(data?._id)
     if(ventureExist)return console.log('venture already exist in connected ventures collections')
     const response=await dbRepo?.createConnectedVentures(data)
    if(response) return console.log('connected venture details inserted successfull',response)
    else return console.log('connected venture details not inserted',response)


}
export default connectedVentures