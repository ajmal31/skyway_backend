import { Server } from "socket.io"
import { connect } from "socket.io-client"


//Helper if it's needed
import { makeMessage } from "../Helper/chatHelper"

const socketConfguration = (server: any) => {

    //create server instance of socket.io
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    })

    //connection establishing
    io.on('connection', (socket) => {

        console.log('connection established succesful', socket.id)

        //incoming messages
        socket.on('message', async (data) => {

            console.log('message received in backend socket configuration', data)
            const { senderId, receiverId, content } = data

            const response = await makeMessage(receiverId, senderId, content)
            if (response?.chatId) {

                let roomId = response?.chatId.toString()
                let content=response?.message
                console.log("rresponse room id",roomId)
                socket.to(roomId).emit("received",content)
                // socket.emit("received",content)
            }






        })

        socket.on('joinRoom', (chatId) => {
            console.log('receive join room event')
            console.log(`joined a particular rooom${chatId}`)
            socket.join(chatId)

        })

        socket.on('disconnect', () => {
            console.log("socket disconnected", socket.id)
        })

    })
    io.on('error', (error) => {
        console.log('error occure while connection socker', error)
    })






}

export default socketConfguration