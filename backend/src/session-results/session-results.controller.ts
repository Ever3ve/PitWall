import { Controller, Post, Query } from '@nestjs/common';
import { SessionResultsService } from './session-results.service';

@Controller('session-results')
export class SessionResultsController {
  constructor(private readonly service: SessionResultsService) {}

  @Post('sync')
  async sync(@Query('year') year: string) {
    if (!year) return { error: 'Year query parameter is required' };
    return this.service.syncSessionResults(Number(year));
  }
}
