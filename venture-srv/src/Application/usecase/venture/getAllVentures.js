const listVentures=async(dbRepo,type)=>{

    
     const Allventures=await dbRepo.getAllVentures(type)
     
     if(!Allventures) return {find:false}
     return Allventures
    
}

export default listVentures