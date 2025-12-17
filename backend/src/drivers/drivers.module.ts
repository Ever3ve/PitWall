import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { Season } from 'src/seasons/season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Season]), ExternalApiModule],
  controllers: [DriversController],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
