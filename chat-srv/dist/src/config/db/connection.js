"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection = (uri) => {
    mongoose_1.default.connect(uri);
    // mongoose.set('debug', true);
    mongoose_1.default.connection.once('open', () => {
        console.log('mongodb connected succesful');
    });
    mongoose_1.default.connection.on('error', () => {
        console.log(`error occured while connecting mongoose `);
    });
};
exports.default = connection;
