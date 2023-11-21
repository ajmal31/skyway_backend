"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serviceImplements = () => {
    const secret_key = 'adminsrv123';
    const tokenGenerate = async (data) => {
        const token = await jsonwebtoken_1.default.sign(data, secret_key);
        return token;
    };
    return {
        tokenGenerate
    };
};
exports.default = serviceImplements;
