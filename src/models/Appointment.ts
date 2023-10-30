import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Tattoo_artist } from "./Tattoo_artist"
import { User } from "./User"

@Entity("appointments")
export class Appointment extends BaseEntity{

   @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!:string
  
  @Column()
  description!:string

  @Column()
  tattoo_artist!:number

  @Column()
  client!:number

  @Column()
  type!:string
  
  @Column()
  appointment_date!:string

  @Column()
  appointment_turn!:string
  
  @Column()
   created_at!:Date

  @Column()
  updated_at!:Date

  @ManyToOne(() => User, (user)=>user.userAppointments)
  @JoinColumn({name: "client"})
   userAppointment!:User

   @ManyToOne(() => Tattoo_artist, (tatto_artists)=>tatto_artists.tattooArtistAppointments)
   @JoinColumn({name: "tattoo_artist"})
    tattoArtistAppointment!:User
 }

