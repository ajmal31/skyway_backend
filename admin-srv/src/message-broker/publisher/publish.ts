
import createChannel from "../config"
const publish=async(foriegn:string,data:Record<string,any>)=>{

     const channel=await createChannel()

      const response=await channel.sendToQueue(foriegn,Buffer.from(JSON.stringify(data)))

      return response



}
export default publish