import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*  @Get('sync/drivers')
  async syncDrivers() {
    return this.ergastSync.syncDrivers(2024);
  } */
}
