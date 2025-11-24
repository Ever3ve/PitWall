import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  principal: string;

  @Column()
  firstSeason: number;

  @Column({ nullable: true })
  lastSeason: number;

  @OneToMany(() => Contract, (c) => c.team)
  contracts: Contract[];
}
