// consumer.js
import ventureRepositoryInterface from "../../Application/repo/venture/ventureRepoInterface.js";
import ventureRepositoryImplements from "../../Framework/database/mongodb/repositories/venture/ventureRepositoryImpl.js";
import ventureServiceInterface from "../../Application/srv/venture/ventureSrvInterface.js";
import ventureServiceImplements from "../../Framework/services/venture/ventureServiceImpl.js";


//use cases
import connectUser from "../../Application/usecase/venture/connectUser.js";
import updateConnectUser from "../../Application/usecase/venture/updateConnectUser.js";
import takeOneVenture from "../../Application/usecase/venture/takeOneVenture.js";


// Publisher
import publisher from "../publisher/publisher.js";


//Message Broker Connection file
import createChannel from "../config.js";


const consumer = async () => {

    const dbrepo = ventureRepositoryInterface(ventureRepositoryImplements())
    const service = ventureServiceInterface(ventureServiceImplements())

    const channel = await createChannel()
    channel?.consume('VENTURE_SRV', async(message) => {

        const data = JSON.parse(message.content)
        console.log('data consuming in venture-srv', data)
        //while user maker request for connect to venture
        if (data?.method === 'call request') connectUser(dbrepo, data)
        //while updating user data shoulbe change replicate user data 
        if (data?.method === "update connect user") updateConnectUser(dbrepo, data)
        //when venture evaluated user is genuine then  take that venture details
        if(data?.method==="taking venture data"){

            const response=await takeOneVenture(dbrepo,data?.vid)
            const foreign='USER-SRV'
            //send to user service
            console.log('this data is sended to user-service',response)
            publisher(foreign,response)

        } 
        channel.ack(message)

    })

};

export default consumer;
