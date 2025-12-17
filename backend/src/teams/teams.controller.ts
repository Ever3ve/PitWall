import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';
import { Team } from './team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Get()
  getAll(): Promise<Team[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Team | null> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id') id: number,
    @Body() data: Partial<Team>,
  ): Promise<Team | null> {
    return this.service.update(id, data);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.service.syncTeams();
  }
}
