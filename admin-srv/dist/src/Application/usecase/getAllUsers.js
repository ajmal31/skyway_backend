"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allUsers = async (dbRepo) => {
    const response = await dbRepo.getAllUsers();
    return response;
};
exports.default = allUsers;
