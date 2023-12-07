import amqp from "amqplib"

const createChannel=async()=>{

    const uri='amqp://localhost'   
    const connection=await amqp.connect(uri)
    const channel= await connection.createChannel()
    const queueName="CHAT-SRV"
    const queue=await channel.assertQueue(queueName)
    return channel

}

export default createChannel