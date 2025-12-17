import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('grand-prix/:grandPrixId')
  async findByGrandPrix(@Param('grandPrixId') grandPrixId: number) {
    return this.service.findByGrandPrix(grandPrixId);
  }

  @Get('year/:year')
  async findByYear(@Param('year') year: number) {
    return this.service.findByYear(year);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.service.syncSessions();
  }
}
