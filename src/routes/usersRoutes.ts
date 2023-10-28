import { Router } from "express";
import { login, register, update, profile, myAppointments } from "../controllers/usersController";
import { auth } from "../middlewares/auth";
import { isTaggedTemplateExpression } from "typescript";
import { isTattooArtist } from "../middlewares/isTattooArtist";



const router = Router()

router.get('/profile', auth, profile)
router.post('/register', register)
router.post('/login', login)
router.put('/update',auth, update)
router.get('/myAppointments',auth, myAppointments)
router.delete('/')

export { router }
