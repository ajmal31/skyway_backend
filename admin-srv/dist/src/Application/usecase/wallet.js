"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getWalletAmount = async (dbRepo) => {
    const response = await dbRepo.getWalletAmount();
};
exports.default = getWalletAmount;
