import { Router } from "express";

const router = Router()

router.post('/register')
router.post('/login')
router.get('/profile')
router.get('/all')

export { router }
