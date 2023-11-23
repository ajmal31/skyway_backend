import createChannel from "../config.js"
const publisher=async(foriegn,data)=>{


   const channel=await createChannel()

   

   
   //const response=await channel.publish('my-exchange','',Buffer.from(JSON.stringify(data)))
   const response=await channel.sendToQueue(foriegn,Buffer.from(JSON.stringify(data)))
   console.log('response in publish',response)
   return response


}

export default publisher