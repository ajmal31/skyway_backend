import createChannel from "../config"
import adminRepInterface from "../../Application/repository/adminRepoInterface"
import adminServiceInterface from "../../Application/service/adminServiceInterface"
import repositoryImplements from "../../Framework/database/mongodb/repositories/respositoryImpl"
import serviceImplements from "../../Framework/services/user/serviceImpl"


//import Use case below
import ventureHandler from "../../Application/usecase/ventureHandler"

const consumer = async () => {

    const dbRepo = adminRepInterface(repositoryImplements())
    const service = adminServiceInterface(serviceImplements())

    const channel = await createChannel()

    channel.consume('ADMIN-SRV', (message) => {
        if (message) {
            const data = JSON.parse(message?.content.toString())
            if (data?.ventureName) {

                ventureHandler(dbRepo,data)

            }

            channel.ack(message)

        } else console.log('message doesnt found')

    })


}

export default consumer