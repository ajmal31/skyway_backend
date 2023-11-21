import createChannel from "../config.js"
const publisher=async(data)=>{


   const channel=await createChannel()

   

   const forignQueue='ADMIN-SRV'
   //const response=await channel.publish('my-exchange','',Buffer.from(JSON.stringify(data)))
   const response=await channel.sendToQueue(forignQueue,Buffer.from(JSON.stringify(data)))
   console.log('response in publish',response)
   return response


}

export default publisher