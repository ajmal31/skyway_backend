"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./src/Framework/webserver/server"));
const config_1 = __importDefault(require("./src/config/config"));
//Create Instance Of Express
const app = (0, express_1.default)();
//Create Server Instance
const server = http_1.default.createServer(app);
//Invoking Server Creating Function
(0, server_1.default)(server, config_1.default.port).startServer();
