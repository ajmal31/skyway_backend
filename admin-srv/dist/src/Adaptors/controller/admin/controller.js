"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminController = (dbrepInterface, dbRepoImplements, serviceInterface, serviceImplements) => {
    const dbRepo = dbrepInterface(dbRepoImplements());
    const service = serviceInterface(serviceImplements());
    console.log('reach in controller');
    const test = (req, res) => {
        return console.log('helo test router');
    };
    return {
        test
    };
};
exports.default = adminController;
