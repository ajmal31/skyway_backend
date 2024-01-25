import amqp from 'amqplib'
const createChannel=async()=>{

    // const uri='amqp://localhost'
    const uri='amqp://host.docker.internal:5672'
    const connection=await amqp.connect(uri)
    const channel=await connection.createChannel()
    const queueName='ADMIN-SRV'
    const queue=channel.assertQueue(queueName)
    return channel



}

export default createChannel