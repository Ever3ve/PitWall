import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.service.getOne(id);
  }

  @Post('sync')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  sync() {
    return this.service.syncDrivers();
  }
}
