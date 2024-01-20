import ventureListAlgorithm from "./ventureListAlgorithm.js"
const getVenturesByCountry=async(dbRepo,type,country)=>{


    const Allventures=await dbRepo.getVenturesByCountry(type,country)

    const payload=ventureListAlgorithm(Allventures)
     console.log("venture based contries",payload)
    return payload


}

export default getVenturesByCountry