import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionResultsService } from './session-results.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('session-results')
export class SessionResultsController {
  constructor(private readonly service: SessionResultsService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('session/:sessionId')
  async findBySession(@Param('sessionId') sessionId: number) {
    return this.service.findBySession(sessionId);
  }

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async sync(@Query('year') year: string) {
    if (!year) return { error: 'Year query parameter is required' };
    return this.service.syncSessionResults(Number(year));
  }
}
