"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const chatModel = new Schema({
    participants: [
        {
            userId: { type: String, required: true },
            userUnReadMessages: { type: Number, required: true, default: 0 },
            ventureId: { type: String, required: true },
            ventureUnReadMessages: { type: Number, required: true, default: 0 }
        }
    ],
    message: [
        {
            type: Schema.Types.ObjectId,
            ref: "messages"
        }
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: "messages" }
}, {
    timestamps: true
});
exports.chatSchema = mongoose_1.default.model('chats', chatModel);
