import { Module } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { SessionController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { GrandPrix } from 'src/grand-prix/grand-prix.entity';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { Season } from 'src/seasons/season.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, GrandPrix, Season]),
    ExternalApiModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
