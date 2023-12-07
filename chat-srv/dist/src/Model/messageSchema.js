"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const messageModel = new Schema({
    senderId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
}, {
    timestamps: true
});
exports.messageSchema = mongoose_1.default.model('messages', messageModel);
