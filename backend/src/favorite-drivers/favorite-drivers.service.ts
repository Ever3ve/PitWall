import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteDriver } from './favorite-drivers.entity';
import { User } from '../users/user.entity';
import { Driver } from '../drivers/driver.entity';

@Injectable()
export class FavoriteDriversService {
  constructor(
    @InjectRepository(FavoriteDriver)
    private favRepo: Repository<FavoriteDriver>,
    @InjectRepository(Driver)
    private driverRepo: Repository<Driver>,
  ) {}

  async addFavorite(userId: number, driverId: number) {
    const driver = await this.driverRepo.findOne({ where: { id: driverId } });
    if (!driver) throw new NotFoundException('Driver not found');

    const count = await this.favRepo.count({ where: { user: { id: userId } } });
    if (count >= 3)
      throw new BadRequestException('You can have max 3 favorite drivers');

    const exists = await this.favRepo.findOne({
      where: { user: { id: userId }, driver: { id: driverId } },
    });
    if (exists) throw new BadRequestException('Driver already in favorites');

    const fav = this.favRepo.create({ user: { id: userId } as User, driver });
    await this.favRepo.save(fav);

    driver.fansCount += 1;
    await this.driverRepo.save(driver);

    return fav;
  }

  async removeFavorite(userId: number, driverId: number) {
    const fav = await this.favRepo.findOne({
      where: { user: { id: userId }, driver: { id: driverId } },
      relations: ['driver'],
    });
    if (!fav) throw new NotFoundException('Favorite not found');

    await this.favRepo.remove(fav);

    fav.driver.fansCount -= 1;
    await this.driverRepo.save(fav.driver);

    return { removed: true };
  }

  async getFavoritesByUser(userId: number) {
    return this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['driver'],
    });
  }
}
