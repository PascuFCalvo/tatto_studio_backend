"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const blackAlienController_1 = require("../controllers/blackAlienController");
const isBlackAlien_1 = require("../middlewares/isBlackAlien");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/getUsers", auth_1.auth, isBlackAlien_1.isBlackAlien, blackAlienController_1.getUsers);
router.put("/changelevel", auth_1.auth, isBlackAlien_1.isBlackAlien, blackAlienController_1.changeLevel);
router.delete("/deleteuser", auth_1.auth, isBlackAlien_1.isBlackAlien, blackAlienController_1.deleteUser);
