"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChatersDetails = exports.getAllChats = exports.getChat = exports.sendMessage = exports.createChat = exports.clearUnreadMessages = exports.unReadChatCount = exports.test = void 0;
const chatHelper_1 = require("../Helper/chatHelper");
const chatController = () => {
    const createChat = async (req, res) => {
        const { ventureId, userId } = req.body;
        const ExistChat = await (0, chatHelper_1.chatExist)(ventureId, userId);
        if (ExistChat)
            return res.json({ message: "chatExist" });
        const response = await (0, chatHelper_1.creatingNewChat)(ventureId, userId);
        if (response)
            return res.json({ response });
    };
    const sendMessage = async (req, res) => {
        const { receiverId, senderId, message } = req.body;
        const response = await (0, chatHelper_1.makeMessage)(receiverId, senderId, message);
        if (response)
            return res.json({ response });
    };
    const getChat = async (req, res) => {
        const { ventureId, userId } = req.body;
        if (ventureId && userId) {
            const response = await (0, chatHelper_1.takeChatDetails)(ventureId, userId);
            return res.json(response);
        }
        else
            return console.log('not found');
    };
    const getAllChats = async (req, res) => {
        const findingId = req?.params.id;
        const { field } = req.body;
        const response = await (0, chatHelper_1.fetchAllChats)(findingId, field);
        return res.json({ response });
    };
    const updateChatersDetails = async (req, res) => {
        const data = req?.body;
        const existDoc = await (0, chatHelper_1.findChater)(data._id);
        if (existDoc)
            return console.log('the Document already exist in the chaters');
        const response = await (0, chatHelper_1.insertChatersDetails)(data);
        if (!response)
            return console.log("did'nt insert the details", response);
        else
            return console.log('chater document inserted successfull', response);
    };
    const clearUnreadMessages = async (req, res) => {
        const { ventureId, userId, field } = req.body;
        const response = await (0, chatHelper_1.readedAllMessages)(field, ventureId, userId);
        return res.json(response);
    };
    const unReadChatCount = async (req, res) => {
        const { field, userId } = req.body;
        const response = await (0, chatHelper_1.takeUnReadChatsCount)(field, userId);
        return res.json(response);
    };
    const test = (req, res) => {
        console.log("hei ima the tester Route 🕺🎯💨");
        res.send("it working in chat-service");
    };
    return {
        test,
        unReadChatCount,
        clearUnreadMessages,
        updateChatersDetails,
        getAllChats,
        getChat,
        sendMessage,
        createChat
    };
};
_a = chatController(), exports.test = _a.test, exports.unReadChatCount = _a.unReadChatCount, exports.clearUnreadMessages = _a.clearUnreadMessages, exports.createChat = _a.createChat, exports.sendMessage = _a.sendMessage, exports.getChat = _a.getChat, exports.getAllChats = _a.getAllChats, exports.updateChatersDetails = _a.updateChatersDetails;
