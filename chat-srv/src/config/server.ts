import { Application } from "express"
import socketConfguration from "../socket.io/socket";
const server = async(app: any, port: any) => {

    let a= await app.listen(port, (err?: any) => {
        if (err) console.error(`Error starting the server: ${err}`);
        else console.log(`Chat service listening on Port ${port}`);
    });
    //invkoking socket configrations
    if(a)socketConfguration(a)
}
export default server