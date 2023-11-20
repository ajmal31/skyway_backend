import { Server } from "http"
const serverConfig=(server:Server,port:Number):{startServer:()=>void}=>{

    const startServer=()=>{
        

     try{
        server.listen(port,()=>{
            console.log(`Admin service Listening on ${port}`)
        })
     }catch(err){
        console.log('Error Occured While Connecting Server',err)
     }
       
        
    }
    

    return {startServer}

}

export default serverConfig