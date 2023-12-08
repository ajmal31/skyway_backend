import createChannel from "../config";

const consumer = async () => {

    const channel = await createChannel()
    channel.consume("CHAT-SRV", (data) => {
        if (data) {
            console.log('chat service data consumed', JSON.parse(data?.content?.toString()));
            channel.ack(data)

        }
        else console.log('chat service while consuming data not found')
        

    })

}

export default consumer