// consumer.js
import createChannel from "../config.js";

const consumer = async () => {
    
    
    const channel=await createChannel()
    channel.consume('VENTURE_SRV',message=>{
       
        const data=JSON.parse(message.content)
        console.log(data)
        if(data.method==='call request') console.log('data is perfect')
        channel.ack(message)
    })
    
};
 
export default consumer;
