"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./src/models/User");
const Appointment_1 = require("./src/models/Appointment");
const _1698248906793_create_table_users_1 = require("./src/migration/1698248906793-create_table_users");
const _1698248971658_create_table_tattoo_artists_1 = require("./src/migration/1698248971658-create_table_tattoo-artists");
const _1698249029689_create_table_appointments_1 = require("./src/migration/1698249029689-create_table_appointments");
const _1698249119765_create_table_portfolio_1 = require("./src/migration/1698249119765-create_table_portfolio");
const _1698249146590_create_table_images_1 = require("./src/migration/1698249146590-create_table_images");
const Tattoo_artist_1 = require("./src/models/Tattoo_artist");
const ImageGallery_1 = require("./src/models/ImageGallery");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        User_1.User,
        Appointment_1.Appointment,
        Tattoo_artist_1.Tattoo_artist,
        ImageGallery_1.ImageGallery
    ],
    migrations: [
        _1698248906793_create_table_users_1.CreateTableUsers1698248906793,
        _1698248971658_create_table_tattoo_artists_1.CreateTableTattooArtists1698248971658,
        _1698249029689_create_table_appointments_1.CreateTableAppointments1698249029689,
        _1698249119765_create_table_portfolio_1.CreateTablePortfolio1698249119765,
        _1698249146590_create_table_images_1.CreateTableImages1698249146590
    ],
    synchronize: false,
    logging: false,
});
// export { AppDataSource }
