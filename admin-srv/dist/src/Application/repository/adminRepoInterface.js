"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepInterface = (respositories) => {
    const ventureDataHandler = (data) => respositories.insertVentureData(data);
    return {
        ventureDataHandler
    };
};
exports.default = adminRepInterface;
