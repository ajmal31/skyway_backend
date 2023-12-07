"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server = (app, port) => {
    app.listen(port, (err) => {
        if (err)
            console.error(`Error starting the server: ${err}`);
        else
            console.log(`Chat service listening on Port ${port}`);
    });
};
exports.default = server;
