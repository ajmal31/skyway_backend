"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepInterface = (repositories) => {
    const ventureDataHandler = (data) => repositories.insertVentureData(data);
    const login = (data) => repositories.login(data);
    const adminExist = (email) => repositories.findAdmin(email);
    const ventureList = () => repositories.findAllventures();
    const userHandler = (data) => repositories.insertUserData(data);
    return {
        userHandler,
        ventureList,
        adminExist,
        ventureDataHandler,
        login
    };
};
exports.default = adminRepInterface;
