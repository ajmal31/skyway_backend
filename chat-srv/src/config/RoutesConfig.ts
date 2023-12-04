import { Application, Express } from "express"
import chatRoutes from "../Routes/chatRoutes"
const RoutesConfig=(app:Application,express:any)=>{

    
     app.use('/api/chat-srv',chatRoutes(express))

}

export default RoutesConfig