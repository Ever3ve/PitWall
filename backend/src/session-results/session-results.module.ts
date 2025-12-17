import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionResult } from './session-result.entity';
import { SessionResultsController } from './session-results.controller';
import { SessionResultsService } from './session-results.service';
import { Module } from '@nestjs/common';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { Session } from 'src/sessions/session.entity';
import { Driver } from 'src/drivers/driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionResult, Session, Driver]),
    ExternalApiModule,
  ],
  controllers: [SessionResultsController],
  providers: [SessionResultsService],
})
export class SessionResultModule {}
