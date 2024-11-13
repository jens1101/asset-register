import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TODO: Consider this practice to declare entities https://typeorm.io/separating-entity-definition

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  @Column("text")
  description!: string;

  @Column()
  filename!: string;

  @Column()
  isPublished!: boolean;
}
