import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { ExternalApiModule } from './external-api/external-api.module';
import { TeamsModule } from './teams/teams.module';
import { ContractsModule } from './contracts/contracts.module';
import { SessionModule } from './sessions/sessions.module';
import { TrackModule } from './tracks/tracks.module';
import { GrandPrixModule } from './grand-prix/grand-prix.module';
import { SessionResultModule } from './session-results/session-results.module';
import { SeasonModule } from './seasons/seasons.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    ExternalApiModule,
    DriversModule,
    TeamsModule,
    ContractsModule,
    SeasonModule,
    TrackModule,
    GrandPrixModule,
    SessionModule,
    SessionResultModule,
  ],
})
export class AppModule {}
