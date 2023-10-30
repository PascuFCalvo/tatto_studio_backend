"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const publicRoutes_1 = require("./routes/publicRoutes");
const usersRoutes_1 = require("./routes/usersRoutes");
const tattoo_artistRoutes_1 = require("./routes/tattoo_artistRoutes");
const appointmentRoutes_1 = require("./routes/appointmentRoutes");
const blackAlienRoutes_1 = require("./routes/blackAlienRoutes");
const database_1 = require("../database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
// routes
app.use('/user', usersRoutes_1.router);
app.use('/appointments', appointmentRoutes_1.router);
app.use('/tattoo_artist', tattoo_artistRoutes_1.router);
app.use('/public', publicRoutes_1.router);
app.use('/blackAlien', blackAlienRoutes_1.router);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running ${PORT}`);
    });
})
    .catch(error => {
    console.log(error);
});
