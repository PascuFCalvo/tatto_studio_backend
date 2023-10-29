import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity("images")
export class ImageGallery extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  portfolio_id!: number

  @Column()
  image_name!: string

  @Column()
  image_url!: string


}