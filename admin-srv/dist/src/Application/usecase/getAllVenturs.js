"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllVentures = async (dbRepo) => {
    const response = await dbRepo.ventureList();
    return response;
};
exports.default = getAllVentures;
