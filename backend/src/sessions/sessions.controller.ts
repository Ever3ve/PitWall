import { Controller, Get } from '@nestjs/common';
import { SessionService } from './sessions.service';

@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
