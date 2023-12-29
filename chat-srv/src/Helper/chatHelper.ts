//import schema if it's needed
import { chatSchema } from "../Model/chatSchema"
import { messageSchema } from "../Model/messageSchema"
import { chatersSchema } from "../Model/chaters"
import { Types } from "mongoose"


const chatHelper = () => {
    //creating chat
    const creatingNewChat = async (vid: string, uid: string) => {
        if (uid && vid) {

            const chat = new chatSchema({
                participants: [
                    {
                        userId: uid,
                        ventureId: vid

                    }

                ]
            })
            const response = await chat.save()
            return response
        }
    }
    //create messages and add chat the messageId
    const makeMessage = async (receiverId: string, senderId: string, message: string) => {


        const data = new messageSchema({

            senderId: senderId,
            receiverId: receiverId,
            content: message
        })
        const messageResponse = await data.save()
        const filterResponse = {
            senderId: messageResponse?.senderId,
            receiverId: messageResponse?.receiverId,
            content: messageResponse?.content
        }
        //adding to chat the messageId
        if (messageResponse) {

            const response = await chatSchema.findOneAndUpdate(
                {
                    participants: {
                        $elemMatch: {
                            $or:
                                [
                                    { ventureId: senderId, userId: receiverId },
                                    { userId: senderId, ventureId: receiverId }
                                ]

                        }
                    }

                },
                {
                    $push: { message: messageResponse._id },
                    $set: { lastMessage: messageResponse._id },
                }, {
                new: true
            })
            return { message: filterResponse, chatId: response?._id }

        }
    }

    //getin all details about particular chat
    const takeChatDetails = async (vid: string, userId: string) => {



        const response = await chatSchema.findOneAndUpdate(
            //check the chat exist or not 
            {
                participants:
                {
                    $elemMatch: { ventureId: vid, userId: userId }
                }
            },
            {
                //if it not exist create new document for a chat
                $setOnInsert:
                {
                    participants: [
                        {
                            ventureId: vid,
                            userId: userId
                        }
                    ],
                    message: []
                }
                //         //upsert if it not insert
                //         //run validator if inserting new by default the schema validations is false 
                //         //setDefault insert ..if we configured by default in schema shoule be wanna insert 
                //         //return after all process document details by default it return previous document
            }, { upsert: true, runValidators: true, setDefaultsOnInsert: true, new: true })
            .populate('message', '-_id')
        return response

    }
    //check IsExist chat or not
    const chatExist = async (vid: string, userId: string) => {

        if (!Types.ObjectId.isValid(vid || userId)) return console.log('invalid ids')
        const response = await chatSchema.exists(
            {
                participants:
                {
                    $elemMatch:
                    {
                        ventureId: vid, userId: userId
                    }

                }
            }
        )
        return response


    }
    //fetch all chat based on particular user or venture
    const fetchAllChats = async (findingId: any,field:string) => {

        const key=`participants.${field}`
        const lookup_key=field ==="userId"? "participants.ventureId" :"participants.userId"
        const response = await chatSchema.aggregate([
            {
                $match: {
                    [key]: findingId
                }
            },
            {
                $lookup: {
                    from: "chaters",
                    localField: lookup_key,
                    foreignField: "data._id",
                    as: "data"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "lastMessage",
                    foreignField: "_id",
                    as: "last_message"
                }
            },{
                $sort:{"last_message.updatedAt":-1}
            }
        ]);
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
    const incrementUnreadcount = async (field: string, senderId: string, receiverId: string) => {

        const fieldName = `participants.$.${field}`

        const response = await chatSchema.findOneAndUpdate({

            participants: {
                $elemMatch: {
                    $or:
                        [
                            { ventureId: senderId, userId: receiverId },
                            { userId: senderId, ventureId: receiverId }
                        ]

                }
            }
        },
            {
                $inc:
                {
                    [fieldName]: 1
                }
            },
            { new: true }
        )
        console.log('after increment ', field, "response", response)
    }
    const readedAllMessages = async (field: string, vid: string, userId: string) => {

        const key = `participants.$.${field}`
        const response = await chatSchema.findOneAndUpdate({

            participants:
            {
                $elemMatch:
                {
                    ventureId: vid,
                    userId: userId
                }
            }
        },
            {
                $set:
                {
                    [key]: 0
                }
            },
            {
                new: true
            }
        )
        return response

    }
    const takeUnReadChatsCount = async (field: string, userId: string) => {

        const key = `participants.${field}`
        const user = `participants.userId`
        let response: number = await chatSchema.countDocuments({ [user]: userId, [key]: { $ne: 0 } })
        return response


    }


    return {
        takeUnReadChatsCount,
        readedAllMessages,
        incrementUnreadcount,
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
    takeUnReadChatsCount,
    readedAllMessages,
    incrementUnreadcount,
    findChater,
    creatingNewChat,
    makeMessage,
    takeChatDetails,
    chatExist,
    fetchAllChats,
    insertChatersDetails
} = chatHelper()