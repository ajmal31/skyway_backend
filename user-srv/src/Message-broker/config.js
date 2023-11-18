import amqp from "amqplib"
const createChannel=async()=>{

    const url="amqp://localhost"
    const connection=await amqp.connect(url)
    const channel=await connection.createChannel()
    const queueName='USER-SRV'
    const queue=await channel.assertQueue(queueName)

    return channel
    
  

}

export default createChannel