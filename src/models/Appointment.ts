import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("appointments")
export class Appointment extends BaseEntity{

   @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!:string
  
  @Column()
  description!:string

  @Column()
  client_name!:string

  @Column()
  tattoo_artist!:string
  
  @Column()
  type!:string
  
  @Column()
  appointment_data!:Date
  
  @Column()
   created_at!:Date

  @Column()
  updated_at!:Date


}
