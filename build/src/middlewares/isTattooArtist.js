"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTattooArtist = void 0;
const isTattooArtist = (req, res, next) => {
    if (req.token.level === "tattoo" || req.token.level === "black_alien") {
        next();
    }
    else {
        return res.json('you are not a tattoo artist');
    }
};
exports.isTattooArtist = isTattooArtist;
