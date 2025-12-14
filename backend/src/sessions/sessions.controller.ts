import { Controller, Post, UseGuards } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.service.syncSessions();
  }
}
