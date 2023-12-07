import createChannel from "../config";

const consumer=async()=>{

    const channel=await createChannel()
    channel.consume("CHAT-SRV",(data)=>{

        console.log('chat service data consumed',JSON.stringify(data))

    })

}

export default consumer