import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GrandPrixService } from './grand-prix.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('grand-prix')
export class GrandPrixController {
  constructor(private readonly service: GrandPrixService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('year/:year')
  findByYear(@Param('year') year: number) {
    return this.service.findByYear(year);
  }

  @Get('grandprix/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.service.syncGrandsPrix();
  }
}
