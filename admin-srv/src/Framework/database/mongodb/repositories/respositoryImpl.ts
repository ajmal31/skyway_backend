import ventureReplicationSchema from "../models/allVentures"
const repositoryImplements = () => {

    const insertVentureData = async (data: Record<string, any>) => {


        const ventureReplicated = data
        const model = new ventureReplicationSchema({

            ventureReplicated
        })
        const response = await model.save()
        
    }

    return {
        insertVentureData
    }


}

export default repositoryImplements