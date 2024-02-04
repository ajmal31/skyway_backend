"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const x_xss_protection_1 = __importDefault(require("x-xss-protection"));
const morgan_1 = __importDefault(require("morgan"));
const ExpressConfig = (app) => {
    //Accept Json Data 
    app.use(express_1.default.json());
    app.set("trust proxy", true);
    //For communicate diffrent servers
    app.use((0, cors_1.default)({ origin: "*" }));
    //Protect HTTP Headers
    app.use((0, helmet_1.default)());
    //Preventing Script Injecting Attacks
    app.use((0, x_xss_protection_1.default)());
    //Convert encrypted data to orginal Form
    app.use(express_1.default.urlencoded({ extended: true }));
    //monitor Perfomance and Security also better for debugging
    app.use((0, morgan_1.default)('dev'));
};
exports.default = ExpressConfig;
