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
exports.deleteAppointment = exports.update = exports.create = void 0;
const Appointment_1 = require("../models/Appointment");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const tattoo_artist = req.body.tattoo_artist;
        const client = req.body.client;
        const type = req.body.type;
        const date = req.body.date;
        const turn = req.body.turn;
        const formatedTurn = turn.toLowerCase();
        const formatedDate = date.replace(/\//g, "-");
        const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        const checkDate = regex.test(formatedDate);
        if (checkDate === false) {
            return res.json({ error: "Date Invalid" });
        }
        const checkAvailableDate = yield Appointment_1.Appointment.findOne({
            where: {
                tattoo_artist,
                appointment_date: formatedDate,
                appointment_turn: formatedTurn,
            },
        });
        if (checkAvailableDate) {
            return res.json({
                error: "Date and turn already in use for this tatto artist ",
            });
        }
        const newAppointment = yield Appointment_1.Appointment.create({
            title: title,
            description: description,
            tattoo_artist: tattoo_artist,
            client: client,
            type: type,
            appointment_date: formatedDate,
            appointment_turn: formatedTurn,
        }).save();
        return res.json({
            success: true,
            message: "Appointment created succesfully",
            appointment: {
                Title: newAppointment.title,
                Description: newAppointment.description,
                Artist: newAppointment.tattoo_artist,
                Date: newAppointment.appointment_date,
                Turn: newAppointment.appointment_turn,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment cant be created",
            error: error,
        });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentToUpdate = req.body.id;
        const updatedAppointment = req.body;
        const messageReturn = "Appointment updated succesfully";
        if (req.body.appointment_date)
            yield Appointment_1.Appointment.update({
                id: parseInt(appointmentToUpdate),
            }, updatedAppointment);
        const updatedUser = yield Appointment_1.Appointment.findOneBy({
            id: parseInt(appointmentToUpdate),
        });
        const response = {
            message: messageReturn,
            updatedUser,
        };
        return res.json(response);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.update = update;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.body.id;
        const messageReturn = "Appointment deleted";
        const appointmentToRemove = yield Appointment_1.Appointment.findOneBy({
            id: parseInt(appointmentId),
        });
        if (!appointmentToRemove) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        yield Appointment_1.Appointment.delete(appointmentId);
        const response = {
            message: messageReturn,
            appointmentRemoved: appointmentToRemove,
        };
        return res.json(response);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.deleteAppointment = deleteAppointment;
