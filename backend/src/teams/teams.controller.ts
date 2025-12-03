import { Controller, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Post('sync')
  sync() {
    return this.service.syncTeams();
  }
}
