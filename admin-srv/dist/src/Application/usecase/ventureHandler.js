"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ventureHandler = async (dbRepo, data) => {
    const response = await dbRepo.ventureDataHandler(data);
};
exports.default = ventureHandler;
