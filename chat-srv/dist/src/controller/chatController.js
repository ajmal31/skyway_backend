"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChats = exports.getChat = exports.sendMessage = exports.createChat = void 0;
const chatHelper_1 = require("../Helper/chatHelper");
const chatController = () => {
    const createChat = async (req, res) => {
        const { receiverId, senderId } = req.body;
        const ExistChat = await (0, chatHelper_1.chatExist)(senderId, receiverId);
        if (ExistChat)
            return res.json({ message: "chatExist" });
        const response = await (0, chatHelper_1.creatingNewChat)(receiverId, senderId);
        if (response)
            return res.json({ response });
    };
    const sendMessage = async (req, res) => {
        const { receiverId, senderId, message } = req.body;
        console.log(receiverId, senderId, message);
        const response = await (0, chatHelper_1.makeMessage)(receiverId, senderId, message);
        if (response)
            return res.json({ response });
    };
    const getChat = async (req, res) => {
        const { senderId, receiverId } = req.body;
        const response = await (0, chatHelper_1.takeChatDetails)(senderId, receiverId);
        return res.json(response);
    };
    const getAllChats = async (req, res) => {
        const findingId = req?.data?.userId;
        console.log('is it get userId', findingId);
        const response = await (0, chatHelper_1.fetchAllChats)(findingId);
        return res.json({ response });
    };
    return {
        getAllChats,
        getChat,
        sendMessage,
        createChat
    };
};
_a = chatController(), exports.createChat = _a.createChat, exports.sendMessage = _a.sendMessage, exports.getChat = _a.getChat, exports.getAllChats = _a.getAllChats;
