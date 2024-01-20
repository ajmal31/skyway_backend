import ventureListAlgorithm from "./ventureListAlgorithm.js"
const listVentures = async (dbRepo, type) => {

     //All ventures list
     const Allventures = await dbRepo.getAllVentures(type)

    const payload= ventureListAlgorithm(Allventures)
    console.log("payload",payload)
     if (!Allventures) return { find: false }
     return payload

}

export default listVentures