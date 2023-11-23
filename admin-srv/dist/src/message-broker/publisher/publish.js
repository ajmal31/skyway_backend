"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const publish = async (foriegn, data) => {
    const channel = await (0, config_1.default)();
    const response = await channel.sendToQueue(foriegn, Buffer.from(JSON.stringify(data)));
    return response;
};
exports.default = publish;
