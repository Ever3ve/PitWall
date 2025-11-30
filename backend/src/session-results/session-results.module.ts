import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionResult } from './session-result.entity';
import { SessionResultsController } from './session-results.controller';
import { SessionResultsService } from './session-results.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([SessionResult])],
  controllers: [SessionResultsController],
  providers: [SessionResultsService],
})
export class SessionResultModule {}
