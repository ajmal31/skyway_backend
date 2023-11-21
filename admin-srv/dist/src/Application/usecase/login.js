"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginUsecase = async (dbRepo, service, data) => {
    let response = {
        message: '',
        token: ''
    };
    const adminExist = await dbRepo.adminExist(data?.email);
    if (!adminExist) {
        response.message = 'Invalid credentials';
        return response;
    }
    if (adminExist?.password === data?.password) {
        //invoking jwt GenerateToken
        const token = await service.tokenGenerate(data);
        response.message = 'Admin login succesful';
        response.token = token;
        return response;
    }
    response.message = 'Invalid Password';
    return response;
};
exports.default = loginUsecase;
