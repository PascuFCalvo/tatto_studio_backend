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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = exports.getArtists = void 0;
const ImageGallery_1 = require("../models/ImageGallery");
const Tattoo_artist_1 = require("../models/Tattoo_artist");
const getArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Artists = yield Tattoo_artist_1.Tattoo_artist.find();
        return res.json({
            message: "Tattoo artist list",
            Artists,
        });
    }
    catch (_a) {
        return res.json({
            success: true,
            message: "cant retrieve tattoo artist list",
        });
    }
});
exports.getArtists = getArtists;
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Images = yield ImageGallery_1.ImageGallery.find();
        return res.json({
            message: "Images list",
            Images,
        });
    }
    catch (_b) {
        return res.json({
            success: true,
            message: "cant retrieve images list",
        });
    }
});
exports.getImages = getImages;
