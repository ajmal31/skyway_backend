"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const chatHelper_1 = require("../../Helper/chatHelper");
const chatHelper_2 = require("../../Helper/chatHelper");
const consumer = async () => {
    const channel = await (0, config_1.default)();
    channel.consume("CHAT-SRV", async (data) => {
        if (data) {
            const message = JSON.parse(data?.content?.toString());
            //These conditon handling Venture and User data for updating chaters
            if (message?.ventureName || message?.username) {
                const existDoc = await (0, chatHelper_1.findChater)(message._id);
                //check whether Document already Exist or not
                if (existDoc) {
                    return channel.ack(data);
                }
                const response = await (0, chatHelper_2.insertChatersDetails)(message);
                return channel.ack(data);
            }
            channel.ack(data);
        }
        else
            console.log('chat service while consuming data not found');
    });
};
exports.default = consumer;
