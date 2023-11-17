const listVentures=async(dbRepo)=>{


     const Allventures=await dbRepo.getAllVentures()
     
     if(!Allventures) return {find:false}
     return Allventures
    
}

export default listVentures