import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./src/models/User"
import { Appointment } from "./src/models/Appointment"
import { CreateTableUsers1698248906793 } from "./src/migration/1698248906793-create_table_users"
import { CreateTableTattooArtists1698248971658 } from "./src/migration/1698248971658-create_table_tattoo-artists"
import { CreateTableAppointments1698249029689 } from "./src/migration/1698249029689-create_table_appointments"
import { CreateTablePortfolio1698249119765 } from "./src/migration/1698249119765-create_table_portfolio"
import { CreateTableImages1698249146590 } from "./src/migration/1698249146590-create_table_images"




export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "karanas3689",
  database: "tattoo",
  entities: [User,Appointment],
  migrations: [
    CreateTableUsers1698248906793,
    CreateTableTattooArtists1698248971658,
    CreateTableAppointments1698249029689,
    CreateTablePortfolio1698249119765,
    CreateTableImages1698249146590 
    
  ],
  synchronize: false,
  logging: false,
})

// export { AppDataSource }
