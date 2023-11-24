"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publish_1 = __importDefault(require("../../message-broker/publisher/publish"));
const updateVentureStatus = async (data) => {
    console.log('status', data);
    const response = await (0, publish_1.default)('VENTURE_SRV', data);
    console.log('after sending to venture srv', response);
    return response;
};
exports.default = updateVentureStatus;
