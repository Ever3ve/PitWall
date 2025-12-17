import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { DriversModule } from '../drivers/drivers.module';
import { TeamsModule } from '../teams/teams.module';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { Driver } from '../drivers/driver.entity';
import { Team } from '../teams/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract, Driver, Team]),
    DriversModule,
    TeamsModule,
    ExternalApiModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
