import { Controller, Get } from '@nestjs/common';
import { GrandPrixService } from './grand-prix.service';

@Controller('grand-prix')
export class GrandPrixController {
  constructor(private readonly service: GrandPrixService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
