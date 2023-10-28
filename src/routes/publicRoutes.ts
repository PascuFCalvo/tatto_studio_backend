import { Router } from "express";
import { getArtists } from "../controllers/publicControllers";




const router = Router()

router.get('/tattooArtists', getArtists)

export { router }
