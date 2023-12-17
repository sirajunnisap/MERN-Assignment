"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthentication = (req, res, next) => {
    try {
        const authHeader = req.headers.user;
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!authHeader || !secretKey) {
            return res.send(401).json({ success: false, message: "not authenticated ", Auth: false });
        }
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false });
    }
};
exports.userAuthentication = userAuthentication;
