"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    USER_SRV_TOKEN_SECRET_KEY: process.env.USER_SRV_TOKEN_SECRET_KEY,
    VENTURE_SRV_TOKEN_SECRET_KEY: process.env.VENTURE_SRV_TOKEN_SECRET_KEY,
};
