import { Controller, Post } from '@nestjs/common';
import { GrandPrixService } from './grand-prix.service';

@Controller('grand-prix')
export class GrandPrixController {
  constructor(private readonly service: GrandPrixService) {}

  @Post('sync')
  getAll() {
    return this.service.syncGrandsPrix();
  }
}
