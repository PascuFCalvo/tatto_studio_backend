import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateTableUser1698164771851 } from "./src/migration/1698164771851-create_table_user"
import { CreateTableCitas1698166728949 } from "./src/migration/1698166728949-create_table_citas"
import { User } from "./src/models/User"
import { Appointment } from "./src/models/Appointment"
import { CreateTablePortfolio1698168603451 } from "./src/migration/1698168603451-create_table_portfolio"
import { CreateTableTattooImages1698168899452 } from "./src/migration/1698168899452-create_table_tattoo-images"
import { CreateTableUsersAppointments1698167981850 } from "./src/migration/1698167981850-create_table_users-appointments"


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "karanas3689",
  database: "tattoo",
  entities: [User,Appointment],
  migrations: [
    CreateTableUser1698164771851,
    CreateTableCitas1698166728949,
    CreateTableUsersAppointments1698167981850,
    CreateTablePortfolio1698168603451,
    CreateTableTattooImages1698168899452
  ],
  synchronize: false,
  logging: false,
})

// export { AppDataSource }
