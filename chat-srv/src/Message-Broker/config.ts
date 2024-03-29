import amqp from "amqplib"

const createChannel=async()=>{
    const url="amqp://rabbitmq-service:5672"// service name
    //const url='amqp://localhost'   
    // const url='amqp://host.docker.internal:5672'   
    const connection=await amqp.connect(url)
    const channel= await connection.createChannel()
    const queueName="CHAT-SRV"
    const queue=await channel.assertQueue(queueName)
    return channel

}

export default createChannel