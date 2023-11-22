"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllVentures = async (dbRepo) => {
    const response = await dbRepo.ventureList();
    console.log('List of ventures', response);
};
exports.default = getAllVentures;
