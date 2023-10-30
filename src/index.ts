import express from "express";
import "dotenv/config"

import { router as routerPublic} from "./routes/publicRoutes"
import { router as routerUsers } from "./routes/usersRoutes";
import { router as routerTattoo_artists } from "./routes/tattoo_artistRoutes";
import { router as routerAppointment } from "./routes/appointmentRoutes";
import { router as routerBlackAlien } from "./routes/blackAlienRoutes";
import { AppDataSource } from "../database";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

// routes
app.use('/user', routerUsers)
app.use('/appointments', routerAppointment)
app.use('/tattoo_artist', routerTattoo_artists)
app.use('/public',routerPublic)
app.use('/blackAlien', routerBlackAlien)

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error)
  })
