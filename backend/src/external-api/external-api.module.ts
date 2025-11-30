import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../drivers/driver.entity';
import { DriversService } from './../drivers/drivers.service';
import { DriversController } from './../drivers/drivers.controller';
import { ExternalApiService } from './external-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [DriversController],
  providers: [DriversService, ExternalApiService],
})
export class ExternalApiModule {}
