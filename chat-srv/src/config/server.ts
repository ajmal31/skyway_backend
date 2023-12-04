import { Application } from "express"

const server = (app: Application, port: any) => {

    app.listen(port, (err?: any) => {
        if (err) console.error(`Error starting the server: ${err}`);
        else console.log(`Chat service listening on Port ${port}`);
    });
}
export default server