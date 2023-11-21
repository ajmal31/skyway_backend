"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../../Application/usecase/login"));
const adminController = (dbrepInterface, dbRepoImplements, serviceInterface, serviceImplements) => {
    const dbRepo = dbrepInterface(dbRepoImplements());
    const service = serviceInterface(serviceImplements());
    //POST METHODS
    const login = async (req, res) => {
        const response = await (0, login_1.default)(dbRepo, service, req.body);
        return res.json(response);
    };
    return {
        login
    };
};
exports.default = adminController;
