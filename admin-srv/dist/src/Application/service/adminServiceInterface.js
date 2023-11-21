"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminServiceInterface = (services) => {
    const tokenGenerate = (data) => services.tokenGenerate(data);
    return {
        tokenGenerate
    };
};
exports.default = adminServiceInterface;
