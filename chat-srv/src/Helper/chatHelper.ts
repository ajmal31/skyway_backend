//import schema if it's needed
import { chatSchema } from "../Model/chatSchema"
import { messageSchema } from "../Model/messageSchema"
import { chatersSchema } from "../Model/chaters"
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
        console.log('what happend after inserting', chatresponse)
        //adding to chat the messageId
        if (chatresponse) {
            const response = await chatSchema.findOneAndUpdate(
                {
                    $or:
                        [
                            { senderId: senderId, receiverId: receiverId },
                            { receiverId: senderId, senderId: receiverId }
                        ]
                },
                { $push: { message: chatresponse._id } }, { new: true })
            return response

        }
    }
    //getin all details about particular chat
    const takeChatDetails = async (senderId: string, receiverId: string) => {

        const response = await chatSchema.findOne(

            {
                $or:
                    [
                        { senderId: senderId, receiverId: receiverId },
                        { receiverId: senderId, senderId: receiverId },

                    ]
            })
            .populate('message', '-_id')
        // const response_two = await chatersSchema.find({ "data._id": { $in: [response_one?.senderId, response_one?.receiverId] }})
        // .select("-_id data")
        // const response={
        //     response_one,
        //     response_two
        // }
        return response


        // continue 
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
    //Insert Chaters Details 
    const insertChatersDetails = async (data: Record<string, any>) => {

        const chat = new chatersSchema({
            data
        })
        const response = await chat.save()
        return response

    }
    //check the the document exist in the chaters
    const findChater = async (id: string) => {

        const response = chatersSchema.findOne({ "data._id": id })
        return response
    }





    return {
        findChater,
        insertChatersDetails,
        fetchAllChats,
        chatExist,
        takeChatDetails,
        makeMessage,
        creatingNewChat
    }


}

export const {
    findChater,
    creatingNewChat,
    makeMessage,
    takeChatDetails,
    chatExist,
    fetchAllChats,
    insertChatersDetails
} = chatHelper()