import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./src/models/User"
import { Appointment } from "./src/models/Appointment"
import { CreateTableUsers1698248906793 } from "./src/migration/1698248906793-create_table_users"
import { CreateTableTattooArtists1698248971658 } from "./src/migration/1698248971658-create_table_tattoo-artists"
import { CreateTableAppointments1698249029689 } from "./src/migration/1698249029689-create_table_appointments"
import { CreateTablePortfolio1698249119765 } from "./src/migration/1698249119765-create_table_portfolio"
import { CreateTableImages1698249146590 } from "./src/migration/1698249146590-create_table_images"
import { Tattoo_artist } from "./src/models/Tattoo_artist"
import { ImageGallery } from "./src/models/ImageGallery"
import "dotenv/config"



export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Appointment,
    Tattoo_artist,
    ImageGallery
  ],
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

