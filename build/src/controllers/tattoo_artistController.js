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
exports.TattooAppointments = exports.registertattoo = void 0;
const Tattoo_artist_1 = require("../models/Tattoo_artist");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Appointment_1 = require("../models/Appointment");
const registertattoo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.body.user_id;
        const user_name = req.body.user_name;
        const email = req.body.email;
        const level = req.body.level;
        const password = req.body.password;
        const phone = req.body.phone;
        const licenseNumber = req.body.licenseNumber;
        const formation = req.body.formation;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.json({ mensagge: "email format not valid" });
        }
        const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
        const newTattooArtist = yield Tattoo_artist_1.Tattoo_artist.create({
            user_id: user_id,
            user_name: user_name,
            email: email,
            level: level,
            password: encryptedPassword,
            phone: phone,
            licenseNumber: licenseNumber,
            formation: formation,
        }).save();
        return res.json({
            success: true,
            message: "tatto artist created succesfully",
            newTattooArtist,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "tatto artist cant be created",
            error: error.message,
        });
    }
});
exports.registertattoo = registertattoo;
const TattooAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.token.id === req.body.id) {
            const tattooArtistId = req.body.tattoo_artist_id;
            const appointments = yield Appointment_1.Appointment.find({
                where: { tattoo_artist: tattooArtistId },
            });
            const message = "Your tattoo appointments";
            const response = {
                message,
                myAppointments: appointments,
            };
            return res.json(response);
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "cant find appointments",
            error: error,
        });
    }
});
exports.TattooAppointments = TattooAppointments;
