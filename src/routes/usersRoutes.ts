import { Router } from "express";
import { login, register } from "../controllers/usersController";
import { profile } from "console";
import { auth } from "../middlewares/auth";


const router = Router()

router.get('/profile',auth, profile)
router.post('/register', register)
router.post('/login', login)
router.put('/')
router.delete('/')

export { router }
