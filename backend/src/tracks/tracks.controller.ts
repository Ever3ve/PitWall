import { Controller, Post } from '@nestjs/common';
import { TrackService } from './tracks.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly service: TrackService) {}

  @Post('sync')
  getAll() {
    return this.service.syncTracks();
  }
}
