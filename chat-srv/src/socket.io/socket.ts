import { Server } from "socket.io"

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
        socket.on('message', (data) => {

            console.log('message received in backend socket configuration', data)
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