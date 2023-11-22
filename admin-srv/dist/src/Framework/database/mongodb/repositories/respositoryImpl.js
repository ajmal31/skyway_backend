"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allVentures_1 = __importDefault(require("../models/allVentures"));
const admin_cred_1 = __importDefault(require("../models/admin-cred"));
const users_1 = __importDefault(require("../models/users"));
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
    const findAllventures = async () => {
        const response = await allVentures_1.default.find();
        return response;
    };
    const insertUserData = async (data) => {
        const user = new users_1.default({ data });
        const response = await user.save();
    };
    return {
        insertUserData,
        findAllventures,
        findAdmin,
        insertVentureData
    };
};
exports.default = repositoryImplements;
