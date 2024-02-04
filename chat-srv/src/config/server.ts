import { Application } from "express"
import socketConfguration from "../socket.io/socket";
const server = async(app: any, port: any) => {
    const temp_port:number=5003
    let response=app.listen(temp_port, (err?: any) => {
        if (err) console.error(`Error starting the server: ${err}`);
        else console.log(`Chat service listening on Port ${temp_port}`);
    });
    //invkoking socket configrations
    if(response)socketConfguration(response)
}
export default server