import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"

@Entity("tattoo-artists")
export class Tattoo_artist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_name!: string

  @Column()
  user_id!:number

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  phone!: string
  
  @Column()
  level!: string
  
  @Column()
  licenseNumber!: string

  @Column()
  formation!: string
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @OneToMany(() => Appointment, (appointment)=>appointment.tattoArtistAppointment)
  tattooArtistAppointments!:Appointment[]

//   @ManyToMany(() => Tattoo_artist)
//   @JoinTable({
//      name: "appointments",
//      joinColumn: {
//         name: "tatto_artists",
//         referencedColumnName: "id",
//      },
//      inverseJoinColumn: {
//         name: "client",
//         referencedColumnName: "id",
//      },
// })
// TattoArtistUsers!:User[]



}
