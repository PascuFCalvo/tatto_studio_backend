import { Router } from "express";
import { changeLevel, deleteUser, getUsers , getAppointments } from "../controllers/blackAlienController";
import { isBlackAlien } from "../middlewares/isBlackAlien";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/getUsers", getUsers);
router.get("/getAppointments",auth, getAppointments);
router.put("/changelevel",changeLevel);
router.delete("/deleteuser", deleteUser);

export { router };
