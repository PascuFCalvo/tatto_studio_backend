import { Router } from "express";

import { auth, } from "../middlewares/auth";
import { TattooAppointments, registertattoo, update } from "../controllers/tattoo_artistController";
import { isBlackAlien } from "../middlewares/isBlackAlien";

import { isTattooArtist } from "../middlewares/isTattooArtist";



const router = Router()


router.post('/register', registertattoo)
router.get('/myAppointments',TattooAppointments)
router.put('/update', update)

export { router }
