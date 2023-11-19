// consumer.js
import ventureRepositoryInterface from "../../Application/repo/venture/ventureRepoInterface.js";
import ventureRepositoryImplements from "../../Framework/database/mongodb/repositories/venture/ventureRepositoryImpl.js";
import ventureServiceInterface from "../../Application/srv/venture/ventureSrvInterface.js";
import ventureServiceImplements from "../../Framework/services/venture/ventureServiceImpl.js";

//use cases
import connectUser from "../../Application/usecase/venture/connectUser.js";


import createChannel from "../config.js";

const consumer = async () => {

     const dbrepo=ventureRepositoryInterface(ventureRepositoryImplements())
     const service=ventureServiceInterface(ventureServiceImplements())

    const channel = await createChannel()
    channel.consume('VENTURE_SRV', message => {

        const data = JSON.parse(message.content)
        
        if(data.method==='call request') connectUser(dbrepo,data)
        channel.ack(message)
        
    })

};

export default consumer;
