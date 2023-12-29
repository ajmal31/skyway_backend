
import {
  creatingNewChat,
  makeMessage,
  takeChatDetails,
  chatExist,
  fetchAllChats,
  insertChatersDetails,
  findChater,
  readedAllMessages,
  takeUnReadChatsCount
  
} from "../Helper/chatHelper"
import { Request, Response, } from "express"

const chatController = () => {


  const createChat = async (req: Request, res: Response) => {



    const { ventureId, userId } = req.body

    const ExistChat = await chatExist(ventureId, userId)
    if (ExistChat) return res.json({ message: "chatExist" })
    const response = await creatingNewChat(ventureId, userId)
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
      _id: string
    }
  }
  const getChat = async (req: extendRequest, res: Response) => {


    const { ventureId, userId } = req.body
    if (ventureId && userId) {
      const response = await takeChatDetails(ventureId, userId)
      return res.json(response)
    } else return console.log('not found')

  }

  const getAllChats = async (req: extendRequest, res: Response) => {

    const findingId = req?.params.id
    const {field}=req.body
    console.log('field',field)
    const response = await fetchAllChats(findingId,field)
   
    return res.json({ response })

  }
  const updateChatersDetails = async (req: Request, res: Response) => {

    const data = req?.body

    const existDoc = await findChater(data._id)
    if (existDoc) return console.log('the Document already exist in the chaters')
    const response = await insertChatersDetails(data)
    if (!response) return console.log("did'nt insert the details", response)
    else return console.log('chater document inserted successfull', response)

  }
  const clearUnreadMessages=async(req:Request,res:Response)=>{

    const {ventureId,userId,field}=req.body
    const response=await readedAllMessages(field,ventureId,userId)
    return res.json(response)

  }
  const unReadChatCount=async(req:Request,res:Response)=>{

    const {field,userId}=req.body
    const response=await takeUnReadChatsCount(field,userId)

    return res.json(response)
    

  }


  return {
    unReadChatCount,
    clearUnreadMessages,
    updateChatersDetails,
    getAllChats,
    getChat,
    sendMessage,
    createChat
  }

}

export const {
  unReadChatCount,
  clearUnreadMessages,
  createChat,
  sendMessage,
  getChat,
  getAllChats,
  updateChatersDetails
} = chatController()