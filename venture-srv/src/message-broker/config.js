import amqp from 'amqplib'

const createChannel = async () => {

    try {
        const url="amqp://rabbitmq-service:5672"// service name
        // const url = 'amqp://host.docker.internal:5672'
        // const url = 'amqp://localhost'
        const connection = await amqp.connect(url)
        const channel = await connection.createChannel()
        const queueName = 'VENTURE_SRV'
        const queue = await channel.assertQueue(queueName)
        
        return channel

    }catch(err){
        console.log('error occured while creaing channel',err)
    }
    

    



}

export default createChannel