"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const createChannel = async () => {
    const uri = 'amqp://localhost';
    // const uri='amqp://host.docker.internal:5672'
    const connection = await amqplib_1.default.connect(uri);
    const channel = await connection.createChannel();
    const queueName = 'ADMIN-SRV';
    const queue = channel.assertQueue(queueName);
    return channel;
};
exports.default = createChannel;
