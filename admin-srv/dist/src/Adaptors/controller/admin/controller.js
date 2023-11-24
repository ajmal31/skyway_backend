"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../../Application/usecase/login"));
const getAllVenturs_1 = __importDefault(require("../../../Application/usecase/getAllVenturs"));
const getAllUsers_1 = __importDefault(require("../../../Application/usecase/getAllUsers"));
const updateVentureStatus_1 = __importDefault(require("../../../Application/usecase/updateVentureStatus"));
const adminController = (dbrepInterface, dbRepoImplements, serviceInterface, serviceImplements) => {
    const dbRepo = dbrepInterface(dbRepoImplements());
    const service = serviceInterface(serviceImplements());
    //POST METHODS
    const login = async (req, res) => {
        const response = await (0, login_1.default)(dbRepo, service, req.body);
        return res.json(response);
    };
    //GET METHODS
    const getAllventures = async (req, res) => {
        const response = await (0, getAllVenturs_1.default)(dbRepo);
        return res.json(response);
    };
    const getAllUsers = async (req, res) => {
        const response = await (0, getAllUsers_1.default)(dbRepo);
        return res.json(response);
    };
    const updateVentureStatus = async (req, res) => {
        const response = await (0, updateVentureStatus_1.default)(req?.body);
        if (response)
            return res.json({ message: "status changed" });
    };
    return {
        updateVentureStatus,
        getAllUsers,
        getAllventures,
        login
    };
};
exports.default = adminController;
