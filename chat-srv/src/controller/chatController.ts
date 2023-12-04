import { base } from "../Helper/chatHelper"
const chatController = () => {

    return {
        log: () => {
           base()
        }
    }

}

export const { log } = chatController()