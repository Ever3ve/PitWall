import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Driver } from '../drivers/driver.entity';

@Entity()
@Unique(['user', 'driver'])
export class FavoriteDriver {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Driver, { onDelete: 'CASCADE' })
  driver: Driver;
}
