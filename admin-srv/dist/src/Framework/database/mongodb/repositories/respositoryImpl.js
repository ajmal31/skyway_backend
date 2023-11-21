"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allVentures_1 = __importDefault(require("../models/allVentures"));
const admin_cred_1 = __importDefault(require("../models/admin-cred"));
const repositoryImplements = () => {
    const insertVentureData = async (data) => {
        const ventureReplicated = data;
        const model = new allVentures_1.default({ ventureReplicated });
        const response = await model.save();
    };
    const findAdmin = async (email) => {
        const response = await admin_cred_1.default.findOne({ email });
        return response;
    };
    return {
        findAdmin,
        insertVentureData
    };
};
exports.default = repositoryImplements;
