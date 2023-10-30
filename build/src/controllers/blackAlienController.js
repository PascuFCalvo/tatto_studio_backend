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
exports.deleteUser = exports.changeLevel = exports.getUsers = void 0;
const User_1 = require("../models/User");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User_1.User.find();
        return res.json({
            message: "User list",
            Users,
        });
    }
    catch (_a) {
        return res.json({
            success: true,
            message: "Cant retrieve user list",
        });
    }
});
exports.getUsers = getUsers;
const changeLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idtoChangeLevel = req.body.id;
        const levelToChange = req.body;
        yield User_1.User.update({ id: idtoChangeLevel }, levelToChange);
        const userChanged = yield User_1.User.findOneBy({ id: idtoChangeLevel });
        return res.json({
            user: userChanged
        });
    }
    catch (error) {
    }
});
exports.changeLevel = changeLevel;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idtoDelete = req.body.id;
        yield User_1.User.delete({ id: idtoDelete });
        return res.json({
            message: "User deleted"
        });
    }
    catch (error) {
    }
});
exports.deleteUser = deleteUser;
