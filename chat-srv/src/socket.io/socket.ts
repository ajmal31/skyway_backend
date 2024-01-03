import { Server } from "socket.io"

//Helper if it's needed
import { makeMessage, incrementUnreadcount } from "../Helper/chatHelper"


const socketConfguration = (server: any) => {

    //create server instance of socket.io
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    })

    //connection establishing
    io.on('connection', (socket: any) => {

        console.log('connection established succesful', socket.id)

        //incoming messages
        socket.on('message', async (data: { senderId: string, receiverId: string, content: string, receiver: string }) => {

            const { senderId, receiverId, content, receiver } = data


            const response = await makeMessage(receiverId, senderId, content)
            const response_two = await incrementUnreadcount(receiver, senderId, receiverId)
            if (response?.chatId) {

                let roomId = response?.chatId.toString()
                let content = response?.message
                const payload = {
                    chatId: roomId,
                    content: content
                }
                 // for all clients exclude sender
                // socket.to(roomId).emit("received",payload)

                //for all client include sender as well 
                io.to(roomId).emit("received",payload)
                
                socket.broadcast.emit("notification", {helo:"helo"});

              
                // socket.emit("received",content)
            }   



        })

        //typing idicator
        socket.on("typing", (chatId: string) => {

            console.log('server side typing event occured', chatId)
            socket.to(chatId).emit("typing")
        })

        socket.on('joinRoom', (chatId: string) => {
            console.log('receive join room event')
            console.log(`joined a particular rooom${chatId}`)
            socket.join(chatId)

        })

        // Additional error handling
        socket.on('error', (error: any) => {
            console.error(`Socket error for client ${socket.id}:`, error);
        });

        socket.on('disconnect', () => {
            console.log("socket disconnected", socket.id)
        })

    })
    io.on('error', (error) => {
        console.log('error occure while connection socker', error)
    })






}

export default socketConfguration