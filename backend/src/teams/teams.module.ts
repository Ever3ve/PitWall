import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { ExternalApiModule } from 'src/external-api/external-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), ExternalApiModule],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
