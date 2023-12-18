import amqp from 'amqplib'

const createChannel = async () => {

    try {

        // const uri = 'amqp://host.docker.internal'
        const uri = 'amqp://localhost'
        const connection = await amqp.connect(uri)
        const channel = await connection.createChannel()
        const queueName = 'VENTURE_SRV'
        const queue = await channel.assertQueue(queueName)
        
        return channel

    }catch(err){
        console.log('error occured while creaing channel',err)
    }
    

    



}

export default createChannel