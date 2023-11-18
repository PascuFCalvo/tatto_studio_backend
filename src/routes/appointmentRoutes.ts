import { Router } from "express";
import { auth } from "../middlewares/auth";

import { create, deleteAppointment, update } from "../controllers/appointmentController";



const router = Router()

//quito el middleware de auth para probar crear citas
router.post('/create', create)
router.put('/update', update)
router.delete('/delete', deleteAppointment)

export { router }