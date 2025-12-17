import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { RolesGuard } from 'src/auth/gurads/roles.guard';
import { UserRole } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('active')
  findActive() {
    return this.service.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('driver/:driverId')
  findByDriver(@Param('driverId') driverId: number) {
    return this.service.findByDriver(driverId);
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: number) {
    return this.service.findByTeam(teamId);
  }

  @Post('sync')
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  sync() {
    return this.service.syncContracts();
  }
}
