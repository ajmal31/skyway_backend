"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../../../../Adaptors/controller/admin/controller"));
const adminRepoInterface_1 = __importDefault(require("../../../../Application/repository/adminRepoInterface"));
const adminServiceInterface_1 = __importDefault(require("../../../../Application/service/adminServiceInterface"));
const serviceImpl_1 = __importDefault(require("../../../services/user/serviceImpl"));
const respositoryImpl_1 = __importDefault(require("../../../database/mongodb/repositories/respositoryImpl"));
const adminRoutes = (express) => {
    const router = express.Router();
    const app = express();
    //Invoking Controller assign to a Varaible
    const controller = (0, controller_1.default)(adminRepoInterface_1.default, respositoryImpl_1.default, adminServiceInterface_1.default, serviceImpl_1.default);
    //POST METHODS
    router.route('/login').post(controller.login);
    //GET METHODS
    // router.route('/getAllventures').get(controller.getAllventures)
    router.route('/getWalletAmount').get(controller.getWalletAmount);
    //PUT METHODS
    return router;
};
exports.default = adminRoutes;
