import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users-citas")
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_id!: number

  @Column()
  appointment_id!: number

 }
