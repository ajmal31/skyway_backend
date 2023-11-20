"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig = (server, port) => {
    const startServer = () => {
        try {
            server.listen(port, () => {
                console.log(`Admin service Listening on ${port}`);
            });
        }
        catch (err) {
            console.log('Error Occured While Connecting Server', err);
        }
    };
    return { startServer };
};
exports.default = serverConfig;
