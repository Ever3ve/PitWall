import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SeasonService } from './seasons.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonsService: SeasonService) {}

  @Get()
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.seasonsService.findOne(id);
  }

  @Get('calendar/:seasonId')
  getCalendar(@Param('seasonId') seasonId: number) {
    return this.seasonsService.getCalendar(seasonId);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.seasonsService.syncSeasons();
  }
}
