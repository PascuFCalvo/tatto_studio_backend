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
exports.myAppointments = exports.update = exports.profile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Appointment_1 = require("../models/Appointment");
require("dotenv/config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_name = req.body.user_name;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        // validacion regex para email (no voy a poner restricciones al password por simplificar)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.json({ mensaje: "email format not valid" });
        }
        const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
        const newUser = yield User_1.User.create({
            user_name: user_name,
            email: email,
            password: encryptedPassword,
            phone: phone,
        }).save();
        return res.json({
            success: true,
            message: "User created succesfully",
            token: newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "user cannot be created",
            error: error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield User_1.User.findOneBy({
            email: email,
        });
        if (!user) {
            return res.status(400).json({
                success: true,
                message: "User or password incorrect",
            });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(400).json({
                success: true,
                message: "User or password incorrect",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            user_name: user.user_name,
            email: user.email,
            phone: user.phone,
            level: user.level,
        }, process.env.JWT_SECRET, {
            expiresIn: "72h",
        });
        return res.json({
            success: true,
            message: "User logged succesfully",
            token: token,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "users cant be logged",
            error: error,
        });
    }
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOneBy({
            id: req.token.id,
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.json({
            success: true,
            message: "User profile retrieved",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User profile cannot be retrieved",
        });
    }
});
exports.profile = profile;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUserData = req.body;
        const userId = req.token.id;
        const message = "Usuario actualizado correctamente";
        yield User_1.User.update({ id: userId }, updatedUserData);
        const updatedUser = yield User_1.User.findOneBy({ id: userId });
        const response = {
            message,
            user: updatedUser,
        };
        return res.json(response);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Hubo un error al actualizar el usuario" });
    }
});
exports.update = update;
const myAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = "Your user appointments";
        if (req.token.id === req.body.id) {
            const user = req.body.id;
            //paginacion
            const pageSize = parseInt(req.query.skip) || 2;
            const page = parseInt(req.query.skip) || 1;
            const skip = (page - 1) * pageSize;
            const myAppointments = yield Appointment_1.Appointment.find({
                where: { client: user },
                select: {
                    id: true,
                    tattoo_artist: true,
                    title: true,
                    description: true,
                    type: true,
                    appointment_date: true,
                    appointment_turn: true,
                },
                skip: skip,
                take: pageSize,
            });
            const response = {
                message: message,
                myAppointments,
            };
            return res.json(response);
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Appointments cannot be retrieved" });
    }
});
exports.myAppointments = myAppointments;
