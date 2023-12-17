"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLogin_1 = require("../controller/user/userLogin");
const userRoute = express_1.default.Router();
userRoute.get('/', userLogin_1.userProfile);
userRoute.post('/signup', userLogin_1.userSignup);
userRoute.post('/login', userLogin_1.userLogin);
exports.default = userRoute;
