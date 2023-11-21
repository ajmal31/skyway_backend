"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allVentures_1 = __importDefault(require("../models/allVentures"));
const repositoryImplements = () => {
    const insertVentureData = async (data) => {
        const ventureReplicated = data;
        const model = new allVentures_1.default({
            ventureReplicated
        });
        const response = await model.save();
    };
    return {
        insertVentureData
    };
};
exports.default = repositoryImplements;
