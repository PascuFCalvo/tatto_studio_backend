import { Router } from "express";
import { getArtists, getImages } from "../controllers/publicControllers";




const router = Router()

router.get('/tattooArtists', getArtists)
router.get('/getImages', getImages)

export { router }
