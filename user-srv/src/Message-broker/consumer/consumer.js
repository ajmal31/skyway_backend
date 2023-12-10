import userRepositoryInterface from "../../Application/repo/user/userRepoInterface.js";
import userRepositoryImplements from "../../Framework/database/mongodb/repositories/user/userRepositoryImpl.js";
import userServiceInterface from "../../Application/srv/user/userSrvInterface.js";
import userServiceImplements from "../../Framework/services/user/userServiceImpl.js";
import util from "util"


// Import usecases
import connectedVentures from "../../Application/usecase/user/connectedVentures.js";

//Message Broker config file
import createChannel from "../config.js";

const consumer = async () => {

    const dbRepo = userRepositoryInterface(userRepositoryImplements())
    const service = userServiceInterface(userServiceImplements())

    const channel = await createChannel()

    // channel.consume('USER-SRV', (message) => {

    //     let data = JSON.parse(message?.content)
    //     data = util.inspect(data, false, null, true)
    //     console.log(`consuming data in user service${data}`)
    //     console.log(data?.ventureName)
    //     if (data?.ventureName) {
    //         console.log('enter expected')
    //         connectedVentures(dbRepo, data)
    //     }
    //     channel.ack(message)

    // })
    channel.consume('USER-SRV', (message) => {
        let data = JSON.parse(message?.content);
        // data = JSON.stringify(data);
        let obj=data
        console.log(`consuming data in user service${data}`);
        
        // Access ventureName directly
        console.log('is it', obj.ventureName);
    
        if (data.ventureName) {
            console.log('enter expected');
            connectedVentures(dbRepo, data);
        }
    
        channel.ack(message);
    });
    


}
export default consumer