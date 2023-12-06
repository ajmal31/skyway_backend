//import schema if it's needed
import { chatSchema } from "../Model/chatSchema"
import { messageSchema } from "../Model/messageSchema"
import { Types } from "mongoose"


const chatHelper = () => {
    //creating chat
    const creatingNewChat = async (receiverId: string, senderId: string) => {

        const user = new chatSchema({
            senderId: senderId,
            receiverId: receiverId,

        })
        const response = await user.save()
        return response

    }
    //create messages and add chat the messageId
    const makeMessage = async (receiverId: string, senderId: string, message: string) => {


        const data = new messageSchema({

            senderId: senderId,
            receiverId: receiverId,
            content: message
        })
        const chatresponse = await data.save()
        //adding to chat the messageId
        if (chatresponse) {
            const response = await chatSchema.findOneAndUpdate({ senderId: senderId, receiverId: receiverId },
                { $push: { message: chatresponse._id } }, { new: true })
            return response

        }
    }
    //getin all details about particular chat
    const takeChatDetails = async (senderId: string, receiverId: string) => {

        console.log(senderId)
        const response = await chatSchema.findOne({ senderId: senderId, receiverId: receiverId })
            .populate('message', '-_id -senderId -receiverId')
        return response

    }
    //check IsExist chat or not
    const chatExist = async (senderId: string, receiverId: string) => {

        if (!Types.ObjectId.isValid(senderId || receiverId)) return console.log('invalid ids')
        const response = await chatSchema.exists({ senderId: senderId, receiverId: receiverId })
        if (response) return response
        else return response


    }
    //fetch all based on particular user or venture
    const fetchAllChats = async (findingId: any) => {
        const response = await chatSchema.find({
            $or:
                [

                    { receiverId: findingId },
                    { senderId: findingId }
                ]
        }).select('-message')
        return response
        
    }





    return {
        fetchAllChats,
        chatExist,
        takeChatDetails,
        makeMessage,
        creatingNewChat
    }


}

export const { creatingNewChat, makeMessage, takeChatDetails, chatExist, fetchAllChats } = chatHelper()