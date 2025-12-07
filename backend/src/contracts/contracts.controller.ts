import { Controller, Post } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly service: ContractsService) {}

  @Post('sync')
  sync() {
    return this.service.syncContracts();
  }
}
