"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlackAlien = void 0;
const isBlackAlien = (req, res, next) => {
    if (req.token && req.token.level === "black_alien") {
        next();
    }
    else {
        return res.json('Your are not the black alien (super_admin)');
    }
};
exports.isBlackAlien = isBlackAlien;
