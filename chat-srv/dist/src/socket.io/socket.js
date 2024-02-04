"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
//Helper if it's needed
const chatHelper_1 = require("../Helper/chatHelper");
const socketConfguration = (server) => {
    //create server instance of socket.io
    const io = new socket_io_1.Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
        }
    });
    //connection establishing
    io.on('connection', (socket) => {
        console.log('connection established succesful', socket.id);
        //incoming messages
        socket.on('message', async (data) => {
            const { senderId, receiverId, content, receiver } = data;
            const response = await (0, chatHelper_1.makeMessage)(receiverId, senderId, content);
            const response_two = await (0, chatHelper_1.incrementUnreadcount)(receiver, senderId, receiverId);
            if (response?.chatId) {
                let roomId = response?.chatId.toString();
                let content = response?.message;
                const payload = {
                    chatId: roomId,
                    content: content
                };
                // for all clients exclude sender
                // socket.to(roomId).emit("received",payload)
                //for all client include sender as well 
                io.to(roomId).emit("received", payload);
                socket.broadcast.emit("notification", { helo: "helo" });
                // socket.emit("received",content)
            }
        });
        //typing idicator
        socket.on("typing", (chatId) => {
            console.log('server side typing event occured', chatId);
            socket.to(chatId).emit("typing");
        });
        socket.on('joinRoom', (chatId) => {
            console.log('receive join room event');
            console.log(`joined a particular rooom${chatId}`);
            socket.join(chatId);
        });
        // Additional error handling
        socket.on('error', (error) => {
            console.error(`Socket error for client ${socket.id}:`, error);
        });
        socket.on('disconnect', () => {
            console.log("socket disconnected", socket.id);
        });
    });
    io.on('error', (error) => {
        console.log('error occure while connection socker', error);
    });
};
exports.default = socketConfguration;
