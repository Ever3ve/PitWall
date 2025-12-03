import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), ExternalApiModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
