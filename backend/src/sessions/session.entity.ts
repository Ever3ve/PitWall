import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GrandPrix } from '../grand-prix/grand-prix.entity';
import { SessionResult } from '../session-results/session-result.entity';

export enum SessionType {
  FP1 = 'fp1',
  FP2 = 'fp2',
  FP3 = 'fp3',
  QUALIFYING = 'quali',
  SPRINT_SHOOTOUT = 'sprint_quali',
  SPRINT = 'sprint',
  RACE = 'race',
}

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SessionType,
  })
  type: SessionType;

  @ManyToOne(() => GrandPrix, (gp) => gp.sessions)
  grandPrix: GrandPrix;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @OneToMany(() => SessionResult, (r) => r.session)
  results: SessionResult[];
}
