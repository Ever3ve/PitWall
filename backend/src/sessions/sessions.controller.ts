import { Controller, Post } from '@nestjs/common';
import { SessionService } from './sessions.service';

@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Post('sync')
  sync() {
    return this.service.syncSessions();
  }
}
