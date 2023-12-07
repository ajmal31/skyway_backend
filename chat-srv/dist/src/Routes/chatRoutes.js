"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("../controller/chatController");
const auth_1 = __importDefault(require("../middleware/auth"));
const env_1 = __importDefault(require("../config/env"));
const chatRoutes = (express) => {
    const router = express.Router();
    //POST METHODS
    router.route('/createChat').post(chatController_1.createChat);
    router.route('/sendMessage').post(chatController_1.sendMessage);
    router.route('/getChat').post(chatController_1.getChat);
    //GET METHODS
    router.route('/getAllChats').get((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.getAllChats);
    return router;
};
exports.default = chatRoutes;
