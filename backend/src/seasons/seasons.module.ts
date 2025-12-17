import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './season.entity';
import { SeasonService } from './seasons.service';
import { SeasonController } from './seasons.controller';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { GrandPrix } from 'src/grand-prix/grand-prix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Season, GrandPrix]), ExternalApiModule],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService],
})
export class SeasonModule {}
