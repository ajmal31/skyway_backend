"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("../controller/chatController");
const auth_1 = __importDefault(require("../middleware/auth"));
const env_1 = __importDefault(require("../config/env"));
const express_1 = __importDefault(require("express"));
const chatRoutes = (expres) => {
    const router = express_1.default.Router();
    const app = (0, express_1.default)();
    //un Validate API's
    //Post Methods  
    router.route('/createChat/user').post((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.createChat);
    router.route('/createChat/venture').post((0, auth_1.default)(env_1.default.VENTURE_SRV_TOKEN_SECRET_KEY), chatController_1.createChat);
    router.route('/sendMessage/user').post((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.sendMessage);
    router.route('/sendMessage/venture').post((0, auth_1.default)(env_1.default.VENTURE_SRV_TOKEN_SECRET_KEY), chatController_1.sendMessage);
    router.route('/sendMessage').post(chatController_1.sendMessage);
    router.route('/updateChatersDetails').post(chatController_1.updateChatersDetails);
    // Validate User Based Methods
    // app.use(jwtVerify(env.USER_SRV_TOKEN_SECRET_KEY))
    //post methods
    router.route('/getChat/user').post((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.getChat);
    router.route('/getChat/venture').post((0, auth_1.default)(env_1.default.VENTURE_SRV_TOKEN_SECRET_KEY), chatController_1.getChat);
    //Get Methods
    router.route('/all/chats/user/:id').post((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.getAllChats);
    router.route('/all/chats/venture/:id').post((0, auth_1.default)(env_1.default.VENTURE_SRV_TOKEN_SECRET_KEY), chatController_1.getAllChats);
    router.route('/clear/unRead/messages/user').post((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.clearUnreadMessages);
    router.route('/clear/unRead/messages/venture').post((0, auth_1.default)(env_1.default.VENTURE_SRV_TOKEN_SECRET_KEY), chatController_1.clearUnreadMessages);
    router.route('/take/unRead/chat/count/user').post((0, auth_1.default)(env_1.default.USER_SRV_TOKEN_SECRET_KEY), chatController_1.unReadChatCount);
    //cloud testing Route
    router.route('/').get(chatController_1.test);
    return router;
};
exports.default = chatRoutes;
