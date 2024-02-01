import amqp from "amqplib"
const createChannel = async () => {



    try {
        const url="amqp://rabbitmq-service:5672"// service name
        //  const url = "amqp://localhost" // local using 
        // const url = "amqp://host.docker.internal:5672" // inside the docker
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