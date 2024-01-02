"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const express_2 = __importDefault(require("./src/Framework/webserver/express"));
const server_1 = __importDefault(require("./src/Framework/webserver/server"));
const config_1 = __importDefault(require("./src/config/config"));
const Routes_1 = __importDefault(require("./src/Framework/webserver/Routes"));
const connection_1 = __importDefault(require("./src/Framework/database/connection"));
const consumer_1 = __importDefault(require("./src/message-broker/consumer/consumer"));
const env_1 = __importDefault(require("./src/config/env"));
//Create Instance Of Express
const app = (0, express_1.default)();
//Create Server Instance
const server = http_1.default.createServer(app);
//Invoking Server Creating Function
(0, server_1.default)(server, config_1.default.port).startServer();
//Invoking Express config Function
(0, express_2.default)(app);
//Connecting Routes 
(0, Routes_1.default)(app, express_1.default);
//connect Db
(0, connection_1.default)(env_1.default.MONGO_URI);
//Invoking Consumer Function
(0, consumer_1.default)();
