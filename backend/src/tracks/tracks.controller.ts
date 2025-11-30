import { Controller, Get } from '@nestjs/common';
import { TrackService } from './tracks.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly service: TrackService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
