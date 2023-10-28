import { Router } from "express";

import { auth, } from "../middlewares/auth";
import { TattooAppointments, registertattoo } from "../controllers/tattoo_artistController";
import { isBlackAlien } from "../middlewares/isBlackAlien";

import { isTattooArtist } from "../middlewares/isTattooArtist";



const router = Router()


router.post('/register',auth,isBlackAlien, registertattoo)
router.get('/myAppointments',auth,isTattooArtist, TattooAppointments)

export { router }
