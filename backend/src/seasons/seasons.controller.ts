import { Controller, Get } from '@nestjs/common';
import { SeasonService } from './seasons.service';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly service: SeasonService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
