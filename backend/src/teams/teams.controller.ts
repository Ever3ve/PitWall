import { Controller, Post, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.service.syncTeams();
  }
}
