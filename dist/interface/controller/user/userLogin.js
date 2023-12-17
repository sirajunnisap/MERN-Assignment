"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.userLogin = exports.userSignup = void 0;
const errorHandle_1 = require("../../../utils/errorHandle");
const userRepository_1 = __importDefault(require("../../../infra/respositories/userRepository"));
const userModel_1 = require("../../../infra/database/model/userModel");
const userSignup_1 = __importDefault(require("../../../app/user/userSignup"));
const db = userModel_1.userModel;
const userRepository = (0, userRepository_1.default)(db);
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user.name || !user.email || !user.password || !user.phone ||
            /^\s*$/.test(user.name) ||
            /^\s*$/.test(user.email) ||
            /^\s*$/.test(user.password)) {
            throw new errorHandle_1.AppError("all field are required  ", 400);
        }
        if (user.password.length < 6) {
            throw new errorHandle_1.AppError("password must be at least 6 digit", 400);
        }
        console.log(user.name, "user data from signup req.body");
        const createNewUser = yield (0, userSignup_1.default)(userRepository)(user);
        if (!createNewUser) {
            res.status(500).json({ message: 'something went wrong' });
        }
        res.status(200).json({ message: "user created successfully" });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'somthing went wrong' });
    }
});
exports.userSignup = userSignup;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("heeeeeeeeeeee");
        const user = req.body;
        console.log(user.name, "body from request");
    }
    catch (error) {
    }
});
exports.userLogin = userLogin;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('profile');
    }
    catch (error) {
    }
});
exports.userProfile = userProfile;
