"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllChats = exports.chatExist = exports.takeChatDetails = exports.makeMessage = exports.creatingNewChat = void 0;
//import schema if it's needed
const chatSchema_1 = require("../Model/chatSchema");
const messageSchema_1 = require("../Model/messageSchema");
const mongoose_1 = require("mongoose");
const chatHelper = () => {
    //creating chat
    const creatingNewChat = async (receiverId, senderId) => {
        const user = new chatSchema_1.chatSchema({
            senderId: senderId,
            receiverId: receiverId,
        });
        const response = await user.save();
        return response;
    };
    //create messages and add chat the messageId
    const makeMessage = async (receiverId, senderId, message) => {
        const data = new messageSchema_1.messageSchema({
            senderId: senderId,
            receiverId: receiverId,
            content: message
        });
        const chatresponse = await data.save();
        //adding to chat the messageId
        if (chatresponse) {
            const response = await chatSchema_1.chatSchema.findOneAndUpdate({ senderId: senderId, receiverId: receiverId }, { $push: { message: chatresponse._id } }, { new: true });
            return response;
        }
    };
    //getin all details about particular chat
    const takeChatDetails = async (senderId, receiverId) => {
        console.log(senderId);
        const response = await chatSchema_1.chatSchema.findOne({ senderId: senderId, receiverId: receiverId })
            .populate('message', '-_id -senderId -receiverId');
        return response;
    };
    //check IsExist chat or not
    const chatExist = async (senderId, receiverId) => {
        if (!mongoose_1.Types.ObjectId.isValid(senderId || receiverId))
            return console.log('invalid ids');
        const response = await chatSchema_1.chatSchema.exists({ senderId: senderId, receiverId: receiverId });
        if (response)
            return response;
        else
            return response;
    };
    //fetch all based on particular user or venture
    const fetchAllChats = async (findingId) => {
        const response = await chatSchema_1.chatSchema.find({
            $or: [
                { receiverId: findingId },
                { senderId: findingId }
            ]
        }).select('-message');
        return response;
    };
    return {
        fetchAllChats,
        chatExist,
        takeChatDetails,
        makeMessage,
        creatingNewChat
    };
};
_a = chatHelper(), exports.creatingNewChat = _a.creatingNewChat, exports.makeMessage = _a.makeMessage, exports.takeChatDetails = _a.takeChatDetails, exports.chatExist = _a.chatExist, exports.fetchAllChats = _a.fetchAllChats;
