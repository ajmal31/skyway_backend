"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server = async (app, port) => {
    const temp_port = 5003;
    let response = app.listen(temp_port, (err) => {
        if (err)
            console.error(`Error starting the server: ${err}`);
        else
            console.log(`Chat service listening on Port ${temp_port}`);
    });
    //invkoking socket configrations
    // if(response)socketConfguration(response)
};
exports.default = server;
