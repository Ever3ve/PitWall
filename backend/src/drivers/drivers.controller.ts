import { Controller, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Post('sync')
  sync() {
    return this.service.syncDrivers();
  }
}
