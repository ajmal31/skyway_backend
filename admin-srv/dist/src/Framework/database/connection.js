"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection = (uri) => {
    //connecting mongodb 
    mongoose_1.default.connect(uri);
    mongoose_1.default.connection.once('open', () => {
        console.log('Admin Service  Mongodb connection Succesfull👽👻');
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.log('Error Occured While Connection Database Mongodb', err);
    });
};
exports.default = connection;
