import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tattoo_artist } from "./Tattoo_artist"

@Entity("users")
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  phone!: string
  
  @Column()
  level!: string
  
    
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

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
userTattoArtists!:Tattoo_artist[]
}


