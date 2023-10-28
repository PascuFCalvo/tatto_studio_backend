import { Router } from "express";
import { getArtists } from "../controllers/publicControllers";




const router = Router()

router.get('/tattoArtists', getArtists)

export { router }
