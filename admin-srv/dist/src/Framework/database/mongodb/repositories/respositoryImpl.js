"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allVentures_1 = __importDefault(require("../models/allVentures"));
const admin_cred_1 = __importDefault(require("../models/admin-cred"));
const users_1 = __importDefault(require("../models/users"));
const wallet_1 = require("../models/wallet");
const repositoryImplements = () => {
    const insertVentureData = async (data) => {
        const model = await allVentures_1.default.findOneAndUpdate({ "ventureReplicated._id": data?._id }, { $set: { ventureReplicated: data } }, { upsert: true });
        return model;
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
        const response = await users_1.default.updateOne({ "data._id": data._id }, { $set: { data } }, { upsert: true });
    };
    const getWalletAmount = async () => {
        const response = await wallet_1.wallet.find();
    };
    return {
        insertUserData,
        findAllventures,
        findAdmin,
        insertVentureData
    };
};
exports.default = repositoryImplements;
