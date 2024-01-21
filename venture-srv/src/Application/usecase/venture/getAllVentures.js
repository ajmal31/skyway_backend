import ventureListAlgorithm from "./ventureListAlgorithm.js"
const listVentures = async (dbRepo, type) => {

     //All ventures list
     const Allventures = await dbRepo.getAllVentures(type)

    const payload= ventureListAlgorithm(Allventures)
     if (!Allventures) return { find: false }
     return payload

}

export default listVentures