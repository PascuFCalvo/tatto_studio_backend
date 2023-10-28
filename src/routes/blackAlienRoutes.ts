import { Router } from "express";
import { changeLevel, deleteUser, getUsers } from "../controllers/blackAlienController";
import { isBlackAlien } from "../middlewares/isBlackAlien";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/getUsers",auth, isBlackAlien, getUsers);
router.put("/changelevel",auth, isBlackAlien, changeLevel);
router.put("/deleteuser",auth, isBlackAlien, deleteUser);

export { router };
