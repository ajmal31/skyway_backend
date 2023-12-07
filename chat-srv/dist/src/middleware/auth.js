"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerify = (secretKey) => {
    return async (req, res, next) => {
        let token = req?.header('Authorization');
        // Check if the token is missing
        if (!token) {
            return res.json({ message: "Access denied. No token provided." });
        }
        // Convert token to lowercase and check if it starts with 'bearer '
        if (!token.toLowerCase().startsWith('bearer ')) {
            return res.json({ message: 'Invalid token format. It should be in the format: Bearer <token>' });
        }
        // Remove 'Bearer ' from the token string
        token = token.slice(7);
        try {
            let decoded = await jsonwebtoken_1.default.verify(token, secretKey); // Use the provided parameter
            req.data = decoded;
            next();
        }
        catch (error) {
            return res.json({ message: 'Error occurred while verifying account using jwt. Token is not matching.', error: error });
        }
    };
};
exports.default = jwtVerify;
// import { Request, Response, NextFunction } from "express"
// import jwt from "jsonwebtoken"
// interface CustomRequest extends Request {
//     data?: any; // Add your custom property and its type here
// }
// const jwtVerify = async (secretKey:any) => {
//    return async(req:CustomRequest,res:Response,next:NextFunction)=>{
//     let token = req?.header('Authorization')
//     // const secretKey = "skyway@1234567"
//     if (!token) return res.json({ message: "access denied no token provided" })
//     if (!token.startsWith('bearer')) return res.json({ message: 'token invalid format' })
//     token = token.slice(7)
//     try {
//         console.log('final token', token)
//         let decoded = await jwt.verify(token, secretKey)
//         req.data = decoded
//         next()
//     } catch (error) {
//         return res.json({ message: 'error occured while verifying account using jwt...token is not mathcing ', error: error })
//     }
//    }
// }
// export default jwtVerify
