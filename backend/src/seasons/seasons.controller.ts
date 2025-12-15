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

  @Get(':year')
  findOne(@Param('year') year: number) {
    return this.seasonsService.findOne(year);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.seasonsService.syncSeasons();
  }
}
