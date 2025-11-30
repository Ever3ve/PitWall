import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Season } from '../seasons/season.entity';
import { Track } from '../tracks/track.entity';
import { Session } from '../sessions/session.entity';

@Entity()
export class GrandPrix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Track, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  track: Track;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @ManyToOne(() => Season, (s) => s.grandPrix, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  season: Season;

  @OneToMany(() => Session, (s) => s.grandPrix)
  sessions: Session[];
}
