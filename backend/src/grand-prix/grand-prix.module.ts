import { Module } from '@nestjs/common';
import { GrandPrix } from './grand-prix.entity';
import { GrandPrixController } from './grand-prix.controller';
import { GrandPrixService } from './grand-prix.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { Track } from 'src/tracks/track.entity';
import { Season } from 'src/seasons/season.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GrandPrix, Track, Season]),
    ExternalApiModule,
  ],
  controllers: [GrandPrixController],
  providers: [GrandPrixService],
})
export class GrandPrixModule {}
