"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/create', auth_1.auth, appointmentController_1.create);
router.put('/update', auth_1.auth, appointmentController_1.update);
router.delete('/delete', auth_1.auth, appointmentController_1.deleteAppointment);
