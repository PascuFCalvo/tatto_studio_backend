"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: "Please, insert a Token for authorization",
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const tokenDecoded = jsonwebtoken_1.default.verify(token, "matasuegras");
            req.token = tokenDecoded;
            next();
        }
        else {
            return res.status(401).json({
                error: "Token invalid",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Authentication error",
        });
    }
};
exports.auth = auth;
