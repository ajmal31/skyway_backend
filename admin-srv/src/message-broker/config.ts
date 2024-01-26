import amqp from 'amqplib'
const createChannel=async()=>{
    
    const url="amqp://rabbitmq-service"// service name
    // const url='amqp://localhost'
    // const url='amqp://host.docker.internal:5672'
    const connection=await amqp.connect(url)
    const channel=await connection.createChannel()
    const queueName='ADMIN-SRV'
    const queue=channel.assertQueue(queueName)
    return channel



}

export default createChannel