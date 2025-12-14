import { Controller, Post, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Roles } from 'src/auth/gurads/roles.decorator';
import { RolesGuard } from 'src/auth/gurads/roles.guard';
import { UserRole } from 'src/users/user.entity';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Post('sync')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  sync() {
    return this.service.syncContracts();
  }
}
