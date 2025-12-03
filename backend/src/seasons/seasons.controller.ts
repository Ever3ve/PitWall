import { Controller, Post, Get } from '@nestjs/common';
import { SeasonService } from './seasons.service';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonsService: SeasonService) {}

  @Post('sync')
  sync() {
    return this.seasonsService.syncSeasons();
  }
}
