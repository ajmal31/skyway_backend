"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const createChannel = async () => {
    const uri = 'amqp://localhost';
    const connection = amqplib_1.default.connect(uri);
};
