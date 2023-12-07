"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const chatModel = new Schema({
    senderId: { type: Schema.Types.ObjectId, required: true, },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    message: [
        {
            type: Schema.Types.ObjectId,
            ref: "messages"
        }
    ]
}, {
    timestamps: true
});
exports.chatSchema = mongoose_1.default.model('chats', chatModel);
