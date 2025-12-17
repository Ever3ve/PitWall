import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { SessionResult } from '../session-results/session-result.entity';
import { GrandPrix } from '../grand-prix/grand-prix.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  externalId: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date | null;

  @Column({ nullable: true })
  country: string;

  @Column({ default: 0 })
  fansCount: number;

  @Column({ nullable: true })
  carNumber: number;

  @ManyToOne(() => GrandPrix, { nullable: true })
  firstGrandPrix: GrandPrix | null;

  @ManyToOne(() => GrandPrix, { nullable: true })
  firstWinGrandPrix: GrandPrix | null;

  @OneToMany(() => Contract, (c) => c.driver)
  contracts: Contract[];

  @OneToMany(() => SessionResult, (r) => r.driver)
  results: SessionResult[];
}
