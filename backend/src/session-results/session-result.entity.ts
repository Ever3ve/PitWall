import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Driver } from '../drivers/driver.entity';
import { Session } from '../sessions/session.entity';

@Entity()
export class SessionResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, (d) => d.results)
  driver: Driver;

  @ManyToOne(() => Session, (s) => s.results)
  session: Session;

  @Column()
  points: number;

  @Column()
  position: number;

  @Column({ nullable: true })
  fastestLap: string;
}
