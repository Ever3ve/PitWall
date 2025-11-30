import { Controller, Get } from '@nestjs/common';
import { SessionResultsService } from './session-results.service';

@Controller('session-results')
export class SessionResultsController {
  constructor(private readonly service: SessionResultsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
