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
const expressConfig = (app) => {
    //Allow Json Format Data's
    app.use(express_1.default.json());
    //HTTP Request Protecting 
    app.use((0, helmet_1.default)());
    //Avoid Xss Attacks Like Script Injecting
    app.use((0, x_xss_protection_1.default)());
    //Allow The Communitcation Procegeours with Another Server
    app.use((0, cors_1.default)());
    //Convert Encrypted Data to orginal Form
    app.use(express_1.default.urlencoded({ extended: true }));
    //Monitor Perfomance And security Also Better for Debugging
    app.use((0, morgan_1.default)('dev'));
};
exports.default = expressConfig;
