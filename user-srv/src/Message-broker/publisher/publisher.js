import createChannel from "../config.js";

const publisher=async(forign,data)=>{
      
    const channel=await createChannel()
     const response=await channel.sendToQueue(forign,Buffer.from(JSON.stringify(data)))
     console.log(`data send to${forign} queue`)
     console.log(response)
     return response
    

}

export default publisher