import { Controller, Post, UseGuards } from '@nestjs/common';
import { GrandPrixService } from './grand-prix.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('grand-prix')
export class GrandPrixController {
  constructor(private readonly service: GrandPrixService) {}

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.service.syncGrandsPrix();
  }
}
