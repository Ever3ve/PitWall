import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TrackService } from './tracks.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('tracks')
export class TrackController {
  constructor(private readonly service: TrackService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('season/:year')
  findBySeason(@Param('year') year: number) {
    return this.service.findBySeason(year);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.service.syncTracks();
  }
}
