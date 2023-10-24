import express from "express";
import { router as routerUsers } from "./routes/usersRoutes";
import { AppDataSource } from "../database";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

// routes
app.use('/user', routerUsers)

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
