"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const adminRepoInterface_1 = __importDefault(require("../../Application/repository/adminRepoInterface"));
const adminServiceInterface_1 = __importDefault(require("../../Application/service/adminServiceInterface"));
const respositoryImpl_1 = __importDefault(require("../../Framework/database/mongodb/repositories/respositoryImpl"));
const serviceImpl_1 = __importDefault(require("../../Framework/services/user/serviceImpl"));
//import Use case below
const ventureHandler_1 = __importDefault(require("../../Application/usecase/ventureHandler"));
const consumer = async () => {
    const dbRepo = (0, adminRepoInterface_1.default)((0, respositoryImpl_1.default)());
    const service = (0, adminServiceInterface_1.default)((0, serviceImpl_1.default)());
    const channel = await (0, config_1.default)();
    channel.consume('ADMIN-SRV', (message) => {
        if (message) {
            const data = JSON.parse(message?.content.toString());
            if (data?.ventureName) {
                (0, ventureHandler_1.default)(dbRepo, data);
            }
            channel.ack(message);
        }
        else
            console.log('message doesnt found');
    });
};
exports.default = consumer;
