import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Driver } from '../drivers/driver.entity';
import { Team } from '../teams/team.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, (d) => d.contracts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  driver: Driver;

  @ManyToOne(() => Team, (t) => t.contracts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  team: Team;

  @Column({ type: 'date' })
  started: Date;

  @Column({ type: 'date', nullable: true })
  ended: Date;
}
