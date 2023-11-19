import { Router } from "express";
import { auth } from "../middlewares/auth";

import { create, deleteAppointment, update } from "../controllers/appointmentController";



const router = Router()


router.post('/create',auth, create)
router.put('/update',auth, update)
router.delete('/delete',auth, deleteAppointment)

export { router }