import createChannel from "../config";
import { findChater } from "../../Helper/chatHelper";
import { insertChatersDetails } from "../../Helper/chatHelper";

const consumer = async () => {

    const channel = await createChannel()
    channel.consume("CHAT-SRV", async (data) => {
        if (data) {
            const message = JSON.parse(data?.content?.toString());
            console.log('chat service consuming', message)

            //These conditon handling Venture and User data for updating chaters
            if (message?.ventureName || message?.username) {

                const existDoc = await findChater(message._id)
                //check whether Document already Exist or not
                if (existDoc) {
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