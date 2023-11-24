"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ventureHandler = async (dbRepo, data) => {
    console.log('venture handler working');
    console.log('venture handler data recived ', data);
    const response = await dbRepo.ventureDataHandler(data);
};
exports.default = ventureHandler;
