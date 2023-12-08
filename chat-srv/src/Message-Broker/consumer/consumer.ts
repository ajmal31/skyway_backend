import createChannel from "../config";
import { findChater } from "../../Helper/chatHelper";
import { insertChatersDetails } from "../../Helper/chatHelper";

const consumer = async () => {

    const channel = await createChannel()
    channel.consume("CHAT-SRV", async (data) => {
        if (data) {
            const message = JSON.parse(data?.content?.toString());

            if (message?.ventureName) {

                const existDoc = await findChater(message._id)
                if (existDoc) {
                    console.log('the Document already exist in the chaters')
                    return channel.ack(data)
                }
                const response = await insertChatersDetails(message)
                return channel.ack(data)


            }
            channel.ack(data)

        }
        else console.log('chat service while consuming data not found')


    })

}

export default consumer