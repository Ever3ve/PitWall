import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SeasonService } from './seasons.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  sync() {
    return this.seasonsService.syncSeasons();
  }
}
