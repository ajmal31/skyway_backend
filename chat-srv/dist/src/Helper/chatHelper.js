"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertChatersDetails = exports.fetchAllChats = exports.chatExist = exports.takeChatDetails = exports.makeMessage = exports.creatingNewChat = exports.findChater = exports.incrementUnreadcount = exports.readedAllMessages = exports.takeUnReadChatsCount = void 0;
//import schema if it's needed
const chatSchema_1 = require("../Model/chatSchema");
const messageSchema_1 = require("../Model/messageSchema");
const chaters_1 = require("../Model/chaters");
const mongoose_1 = require("mongoose");
const chatHelper = () => {
    //creating chat
    const creatingNewChat = async (vid, uid) => {
        if (uid && vid) {
            const chat = new chatSchema_1.chatSchema({
                participants: [
                    {
                        userId: uid,
                        ventureId: vid
                    }
                ]
            });
            const response = await chat.save();
            return response;
        }
    };
    //create messages and add chat the messageId
    const makeMessage = async (receiverId, senderId, message) => {
        const data = new messageSchema_1.messageSchema({
            senderId: senderId,
            receiverId: receiverId,
            content: message
        });
        const messageResponse = await data.save();
        const filterResponse = {
            senderId: messageResponse?.senderId,
            receiverId: messageResponse?.receiverId,
            content: messageResponse?.content
        };
        //adding to chat the messageId
        if (messageResponse) {
            const response = await chatSchema_1.chatSchema.findOneAndUpdate({
                participants: {
                    $elemMatch: {
                        $or: [
                            { ventureId: senderId, userId: receiverId },
                            { userId: senderId, ventureId: receiverId }
                        ]
                    }
                }
            }, {
                $push: { message: messageResponse._id },
                $set: { lastMessage: messageResponse._id },
            }, {
                new: true
            });
            return { message: filterResponse, chatId: response?._id };
        }
    };
    //getin all details about particular chat
    const takeChatDetails = async (vid, userId) => {
        const response = await chatSchema_1.chatSchema.findOneAndUpdate(
        //check the chat exist or not 
        {
            participants: {
                $elemMatch: { ventureId: vid, userId: userId }
            }
        }, {
            //if it not exist create new document for a chat
            $setOnInsert: {
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
            .populate('message', '-_id');
        return response;
    };
    //check IsExist chat or not
    const chatExist = async (vid, userId) => {
        if (!mongoose_1.Types.ObjectId.isValid(vid || userId))
            return console.log('invalid ids');
        const response = await chatSchema_1.chatSchema.exists({
            participants: {
                $elemMatch: {
                    ventureId: vid, userId: userId
                }
            }
        });
        return response;
    };
    //fetch all chat based on particular user or venture
    const fetchAllChats = async (findingId, field) => {
        const key = `participants.${field}`;
        const lookup_key = field === "userId" ? "participants.ventureId" : "participants.userId";
        const response = await chatSchema_1.chatSchema.aggregate([
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
            }, {
                $sort: { "last_message.updatedAt": -1 }
            }
        ]);
        return response;
    };
    //Insert Chaters Details 
    const insertChatersDetails = async (data) => {
        const chat = new chaters_1.chatersSchema({
            data
        });
        const response = await chat.save();
        return response;
    };
    //check the the document exist in the chaters
    const findChater = async (id) => {
        const response = chaters_1.chatersSchema.findOne({ "data._id": id });
        return response;
    };
    const incrementUnreadcount = async (field, senderId, receiverId) => {
        const fieldName = `participants.$.${field}`;
        const response = await chatSchema_1.chatSchema.findOneAndUpdate({
            participants: {
                $elemMatch: {
                    $or: [
                        { ventureId: senderId, userId: receiverId },
                        { userId: senderId, ventureId: receiverId }
                    ]
                }
            }
        }, {
            $inc: {
                [fieldName]: 1
            }
        }, { new: true });
    };
    const readedAllMessages = async (field, vid, userId) => {
        const key = `participants.$.${field}`;
        const response = await chatSchema_1.chatSchema.findOneAndUpdate({
            participants: {
                $elemMatch: {
                    ventureId: vid,
                    userId: userId
                }
            }
        }, {
            $set: {
                [key]: 0
            }
        }, {
            new: true
        });
        return response;
    };
    const takeUnReadChatsCount = async (field, userId) => {
        const key = `participants.${field}`;
        const user = `participants.userId`;
        let response = await chatSchema_1.chatSchema.countDocuments({ [user]: userId, [key]: { $ne: 0 } });
        return response;
    };
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
    };
};
_a = chatHelper(), exports.takeUnReadChatsCount = _a.takeUnReadChatsCount, exports.readedAllMessages = _a.readedAllMessages, exports.incrementUnreadcount = _a.incrementUnreadcount, exports.findChater = _a.findChater, exports.creatingNewChat = _a.creatingNewChat, exports.makeMessage = _a.makeMessage, exports.takeChatDetails = _a.takeChatDetails, exports.chatExist = _a.chatExist, exports.fetchAllChats = _a.fetchAllChats, exports.insertChatersDetails = _a.insertChatersDetails;
