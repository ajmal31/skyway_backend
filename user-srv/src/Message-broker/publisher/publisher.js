import createChannel from "../config.js";

const publisher=async(foreign,data)=>{
      
    const channel=await createChannel()
     const response=await channel.sendToQueue(foreign,Buffer.from(JSON.stringify(data)))
     console.log(`data send to${foreign} queue`)
     console.log(response)
     return response
    

}

export default publisher