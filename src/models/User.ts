import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tattoo_artist } from "./Tattoo_artist";
import { Appointment } from "./Appointment";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column()
  level!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.userAppointment)
  userAppointments!: Appointment[];

  @ManyToMany(() => Tattoo_artist)
  @JoinTable({
    name: "appointments",
    joinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tattoo_artist",
      referencedColumnName: "id",
    },
  })
  userTattoArtists!: Tattoo_artist[];
}
