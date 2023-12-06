
import { creatingNewChat, makeMessage, takeChatDetails, chatExist,fetchAllChats } from "../Helper/chatHelper"
import { Request, Response, } from "express"

const chatController = () => {


    const createChat = async (req: Request, res: Response) => {


        const { receiverId, senderId } = req.body
        const ExistChat = await chatExist(senderId, receiverId)
        if(ExistChat) return res.json({message:"chatExist"})
        const response = await creatingNewChat(receiverId, senderId)
        if(response) return res.json({response}) 

    }
    const sendMessage = async (req: Request, res: Response) => {

        const { receiverId, senderId, message } = req.body
        console.log(receiverId, senderId, message)
        const response = await makeMessage(receiverId, senderId, message)
        if(response)return res.json({response})



    }
    const getChat = async (req: Request, res: Response) => {

        const { senderId, receiverId } = req.body
       
            const response = await takeChatDetails(senderId, receiverId)
            return res.json(response)
        


    }
    //Server request Extende for jwt auth
    interface extendRequest extends Request{
        data?:{
            userId:string
        }
    }
    const getAllChats=async(req:extendRequest,res:Response)=>{
 
        const findingId=req?.data?.userId
        console.log('is it get userId',findingId)
        const response=await fetchAllChats(findingId)
        return res.json({response})

    }


    return {
        getAllChats,
        getChat,
        sendMessage,
        createChat
    }

}

export const { createChat, sendMessage, getChat,getAllChats } = chatController()