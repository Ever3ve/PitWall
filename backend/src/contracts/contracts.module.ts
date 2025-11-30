import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { DriversModule } from '../drivers/drivers.module';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), DriversModule, TeamsModule],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
