import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('float')
  lengthKm: number;

  @Column()
  laps: number;

  @Column()
  turns: number;

  @Column()
  yearOpened: number;
}
