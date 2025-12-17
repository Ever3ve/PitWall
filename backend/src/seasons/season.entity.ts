import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @OneToMany(() => GrandPrix, (gp) => gp.season)
  grandPrix: GrandPrix[];
}
