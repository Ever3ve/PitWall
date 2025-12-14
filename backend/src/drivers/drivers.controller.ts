import { Controller, Post, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { RolesGuard } from 'src/auth/gurads/roles.guard';

@Controller('drivers')
export class DriversController {
  constructor(private readonly service: DriversService) {}

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.service.syncDrivers();
  }
}
