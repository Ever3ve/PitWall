import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteDriver } from './favorite-drivers.entity';
import { FavoriteDriversService } from './favorite-drivers.service';
import { FavoriteDriversController } from './favorite-drivers.controller';
import { Driver } from '../drivers/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteDriver, Driver])],
  providers: [FavoriteDriversService],
  controllers: [FavoriteDriversController],
  exports: [FavoriteDriversService],
})
export class FavoriteDriversModule {}
