"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./src/config/env"));
const expressConfig_1 = __importDefault(require("./src/config/expressConfig"));
const RoutesConfig_1 = __importDefault(require("./src/config/RoutesConfig"));
const connection_1 = __importDefault(require("./src/config/db/connection"));
const server_1 = __importDefault(require("./src/config/server"));
const http_1 = __importDefault(require("http"));
//Create Express Instance
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
//Invking Express configuration function
(0, expressConfig_1.default)(app);
//Invoking Routes Config
(0, RoutesConfig_1.default)(app, express_1.default);
//RabbitMQ consumer
// consumer()
//Invokign Database configuration function
(0, connection_1.default)(env_1.default.MONGO_URI);
//server
(0, server_1.default)(httpServer, env_1.default.PORT);
