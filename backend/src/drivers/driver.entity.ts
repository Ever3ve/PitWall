import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { SessionResult } from '../session-results/session-result.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  country: string;

  @Column({ default: 0 })
  fansCount: number;

  @Column()
  carNumber: number;

  @Column({ nullable: true })
  firstRace: string;

  @Column({ nullable: true })
  firstWin: string;

  @OneToMany(() => Contract, (c) => c.driver)
  contracts: Contract[];

  @OneToMany(() => SessionResult, (r) => r.driver)
  results: SessionResult[];
}
