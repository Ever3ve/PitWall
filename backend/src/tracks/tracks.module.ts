import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { ExternalApiModule } from '../external-api/external-api.module';
import { GrandPrix } from 'src/grand-prix/grand-prix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, GrandPrix]), ExternalApiModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
