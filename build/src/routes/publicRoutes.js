"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const publicControllers_1 = require("../controllers/publicControllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/tattooArtists', publicControllers_1.getArtists);
router.get('/getImages', publicControllers_1.getImages);
