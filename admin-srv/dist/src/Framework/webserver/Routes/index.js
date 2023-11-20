"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRoutes_1 = __importDefault(require("./admin/adminRoutes"));
const Routes = (app, express) => {
    app.use('/api/admin-srv/', (0, adminRoutes_1.default)(express));
};
exports.default = Routes;
