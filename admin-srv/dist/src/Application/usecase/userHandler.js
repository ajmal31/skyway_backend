"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userHandler = async (dbRepo, data) => {
    const response = await dbRepo.userHandler(data);
};
exports.default = userHandler;
