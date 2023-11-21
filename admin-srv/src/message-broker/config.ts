import amqp from 'amqplib'
const createChannel=async()=>{

    const uri='amqp://localhost'
    const connection=await amqp.connect(uri)
    const channel=await connection.createChannel()
    const queueName='ADMIN-SRV'
    const queue=channel.assertQueue(queueName)
    return channel



}

export default createChannel