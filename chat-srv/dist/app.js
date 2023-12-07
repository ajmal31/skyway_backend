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
//Create Express Instance
const app = (0, express_1.default)();
//Invking Express configuration function
(0, expressConfig_1.default)(app);
//Invoking Routes Config
(0, RoutesConfig_1.default)(app, express_1.default);
//Invokign Database configuration function
(0, connection_1.default)(env_1.default.MONGO_URI);
//server
(0, server_1.default)(app, env_1.default.PORT);
