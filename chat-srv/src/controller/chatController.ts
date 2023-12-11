
import {
    creatingNewChat,
    makeMessage,
    takeChatDetails,
    chatExist,
    fetchAllChats,
    insertChatersDetails,
    findChater
} from "../Helper/chatHelper"
import { Request, Response, } from "express"

const chatController = () => {


    const createChat = async (req: Request, res: Response) => {


        const { receiverId, senderId } = req.body
        const ExistChat = await chatExist(senderId, receiverId)
        if (ExistChat) return res.json({ message: "chatExist" })
        const response = await creatingNewChat(receiverId, senderId)
        if (response) return res.json({ response })

    }
    const sendMessage = async (req: Request, res: Response) => {

        const { receiverId, senderId, message } = req.body
        console.log(receiverId, senderId, message)
        const response = await makeMessage(receiverId, senderId, message)
        if (response) return res.json({ response })



    }
    //Server request Extende for jwt auth
    interface extendRequest extends Request {
        data?: {
            userId: string,
            _id:string
        }
    }
    const getChat = async (req: extendRequest, res: Response) => {

        let senderId
        const { receiverId } = req.body
        
        if(req?.body?.roll==="venture")senderId=req?.data?._id

        
        else senderId=req?.data?.userId
        console.log('current roll',req.body)
        console.log("senderId in chat controller of chat-service line 50",senderId)  
        console.log("receiverId in chat controller of chat-service line 51",receiverId)  


        if(senderId&&receiverId){
            const response = await takeChatDetails(senderId, receiverId)
            console.log('response of while taking chat',response) 
            return res.json(response)
        }else return console.log('not found')
        
    }

    const getAllChats = async (req: extendRequest, res: Response) => {

        const findingId = req?.data?.userId
        console.log('is it get userId', findingId)
        const response = await fetchAllChats(findingId)
        console.log('all chating ventures',response)
        return res.json({ response })

    }
    const updateChatersDetails = async (req: Request, res: Response) => {

        const data = req?.body
        console.log(data)
        const existDoc = await findChater(data._id)
        console.log('response whil check the document exist or not', existDoc)
        if (existDoc) return console.log('the Document already exist in the chaters')
        const response = await insertChatersDetails(data)
        if (!response) return console.log("did'nt insert the details", response)
        else return console.log('chater document inserted successfull', response)

    }


    return {
        updateChatersDetails,
        getAllChats,
        getChat,
        sendMessage,
        createChat
    }

}

export const {
    createChat,
    sendMessage,
    getChat,
    getAllChats,
    updateChatersDetails
} = chatController()