import createChannel from "../config"
import adminRepInterface from "../../Application/repository/adminRepoInterface"
import adminServiceInterface from "../../Application/service/adminServiceInterface"
import repositoryImplements from "../../Framework/database/mongodb/repositories/respositoryImpl"
import serviceImplements from "../../Framework/services/user/serviceImpl"


//import Use case below
import ventureHandler from "../../Application/usecase/ventureHandler"
import userHandler from "../../Application/usecase/userHandler"

const consumer = async () => {

    const dbRepo = adminRepInterface(repositoryImplements())
    const service = adminServiceInterface(serviceImplements())

    //Invoking channel Creating function
    const channel = await createChannel()

    channel.consume('ADMIN-SRV', (message) => {
        if (message) {
            console.log('messag consumes in admin service')
            const data = JSON.parse(message?.content.toString())
            console.log(data)
            if (data?.ventureName) {

                ventureHandler(dbRepo, data)

            } else if(data?.username){

                
                userHandler(dbRepo,data)
            }


            channel.ack(message)

        } else console.log('message doesnt found in admin service')

    })


}

export default consumer