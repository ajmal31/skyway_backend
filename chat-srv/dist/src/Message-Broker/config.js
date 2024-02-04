"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const createChannel = async () => {
    const url = "amqp://rabbitmq-service:5672"; // service name
    //const url='amqp://localhost'   
    // const url='amqp://host.docker.internal:5672'   
    const connection = await amqplib_1.default.connect(url);
    const channel = await connection.createChannel();
    const queueName = "CHAT-SRV";
    const queue = await channel.assertQueue(queueName);
    return channel;
};
exports.default = createChannel;
