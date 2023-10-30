"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tattoo_artist = void 0;
const typeorm_1 = require("typeorm");
let Tattoo_artist = class Tattoo_artist extends typeorm_1.BaseEntity {
};
exports.Tattoo_artist = Tattoo_artist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tattoo_artist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tattoo_artist.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "licenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tattoo_artist.prototype, "formation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tattoo_artist.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tattoo_artist.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Tattoo_artist),
    (0, typeorm_1.JoinTable)({
        name: "appointments",
        joinColumn: {
            name: "tatto_artists",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "client",
            referencedColumnName: "id",
        },
    }),
    __metadata("design:type", Array)
], Tattoo_artist.prototype, "TattoArtistUsers", void 0);
exports.Tattoo_artist = Tattoo_artist = __decorate([
    (0, typeorm_1.Entity)("tattoo-artists")
], Tattoo_artist);
