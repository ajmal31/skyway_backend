import amqp from "amqplib"
const createChannel = async () => {



    try {
        // const url = "amqp://localhost"
        const url = "amqp://host.docker.internal:5672"
        const connection = await amqp.connect(url)
        const channel = await connection.createChannel()
        const queueName = 'USER-SRV'
        const queue = await channel.assertQueue(queueName)

        return channel

    } catch (error) {
        console.log('error occured while creating channel',error)

    }




}

export default createChannel