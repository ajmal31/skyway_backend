"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepInterface = (respositories) => {
    const ventureDataHandler = (data) => respositories.insertVentureData(data);
    const login = (data) => respositories.login(data);
    const adminExist = (email) => respositories.findAdmin(email);
    const ventureList = () => respositories.findAllventures();
    return {
        ventureList,
        adminExist,
        ventureDataHandler,
        login
    };
};
exports.default = adminRepInterface;
